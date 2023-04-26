import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const GLOBAL_GUARD_PROVIDER = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export default GLOBAL_GUARD_PROVIDER;
