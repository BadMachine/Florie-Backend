import {Controller, Get, Query} from '@nestjs/common';
import {FaqService} from './faq.service';

@Controller('api/faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async getAll() {
    return this.faqService.getAll();
  }
}
