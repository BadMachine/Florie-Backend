import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { decode, JwtPayload } from 'jsonwebtoken';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')?.at(-1);
    const {
      user: { ID },
    } = decode(token) as JwtPayload;

    return ID;
  },
);
