import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import {SpacesProvider} from './index';

@Module({
  imports: [],
  exports: [SpacesService],
  providers: [SpacesProvider, SpacesService],
})
export class SpacesModule {}
