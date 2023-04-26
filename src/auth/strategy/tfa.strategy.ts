import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {AuthService} from '../auth.service';

@Injectable()
export class TFAStrategy extends PassportStrategy(Strategy, 'tfa') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'ID', passwordField: 'smscode' });
  }

  async validate(ID: string, smscode: string): Promise<any> {
    // const result = await this.authService.validateTFA(ID, smscode);
    //
    // if (!result)
    //   throw new UnauthorizedException({
    //     isSuccess: false,
    //     message: '',
    //   });
    //
    // return result;
    return 1;
  }
}
