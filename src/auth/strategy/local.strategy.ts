import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {AuthService} from '../auth.service';
// import { Messages } from '../../database/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    // const result = await this.authService.validateCredentials(email, password);
    //
    // if (!result || !result?.isSuccess)
    //   throw new UnauthorizedException({
    //     isSuccess: false,
    //     message: 'error',
    //   });
    //
    // return result;
    return 1;
  }
}
