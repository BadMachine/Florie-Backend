import {Module} from '@nestjs/common';
import {FaqController} from './faq.controller';
import {FaqService} from './faq.service';

@Module({
  controllers: [FaqController],
  exports: [FaqService],
  providers: [FaqService],
})
export class FaqModule {}
