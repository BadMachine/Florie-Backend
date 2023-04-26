import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { DoSpacesServiceLib } from './index';
import { Express } from 'express';

@Injectable()
export class SpacesService {
  constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {}

  async uploadFile(
    file: Express.Multer.File,
    path: string[],
    name?: string,
  ): Promise<string> {
    const fileName = name?.trim() || `${file.originalname}`;

    // Return a promise that resolves only when the file upload is complete
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: `${path.join('/')}/${fileName}`,
          Body: file.buffer,
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(
              `https://${process.env.BUCKET_NAME}.${
                process.env.SPACES_ENDPOINT
              }/${path.join('/')}/${fileName}`,
            );
          } else {
            reject(
              new Error(
                `SpacesService_ERROR: ${
                  error.message || 'Something went wrong'
                }`,
              ),
            );
          }
        },
      );
    });
  }

  async deleteFiles(path: string, filenames: string[]) {
    return new Promise((resolve, reject) => {
      this.s3
        .listObjectsV2({
          Bucket: process.env.BUCKET_NAME,
          MaxKeys: 1000,
          Prefix: path + '/',
          Delimiter: '',
        })
        .promise()
        .then(async (data) => {
          // params for delete operation
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: { Objects: [] },
          };
          // add keys to Delete Object
          data.Contents.forEach((content) => {
            if (filenames.includes(content.Key.split('/').pop())) {
              params.Delete.Objects.push({ Key: content.Key });
            }
          });
          // delete all keys
          await this.s3.deleteObjects(params).promise();
          resolve(true);
          // check if ct is presen
        })
        .catch((err) => reject(err));
    });
  }
  /**
   * delete a folder recursively
   * @param bucket
   * @param path - without end /
   */
  deleteFolder(path: string) {
    return new Promise((resolve, reject) => {
      // get all keys and delete objects
      const getAndDelete = (ct: string = null) => {
        this.s3
          .listObjectsV2({
            Bucket: process.env.BUCKET_NAME,
            MaxKeys: 1000,
            ContinuationToken: ct,
            Prefix: path + '/',
            Delimiter: '',
          })
          .promise()
          .then(async (data) => {
            // params for delete operation
            const params = {
              Bucket: process.env.BUCKET_NAME,
              Delete: { Objects: [] },
            };
            // add keys to Delete Object
            data.Contents.forEach((content) => {
              params.Delete.Objects.push({ Key: content.Key });
            });
            // delete all keys
            await this.s3.deleteObjects(params).promise();
            // check if ct is present
            if (data.NextContinuationToken)
              getAndDelete(data.NextContinuationToken);
            else resolve(true);
          })
          .catch((err) => reject(err));
      };

      // init call
      getAndDelete();
    });
  }

  async uploadFiles(path: string[], files: Express.Multer.File[]) {
    const filePromises = files.map(async (file) => {
      return this.uploadFile(file, path);
    });

    await Promise.all(filePromises);
  }

  async downloadFile(
    path: string[],
    fileName: string,
  ): Promise<AWS.S3.GetObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: `${path.join('/')}/${fileName}`,
        },
        (error: AWS.AWSError, data) => {
          if (!error) {
            resolve(data);
          } else {
            resolve(null);
          }
        },
      );
    });
  }

  createMulterLikeFile(content: string | Buffer, filename: string) {
    return {
      originalname: filename,
      buffer:
        typeof content === 'string' ? Buffer.from(content, 'utf-8') : content,
    } as unknown as Express.Multer.File;
  }
}
