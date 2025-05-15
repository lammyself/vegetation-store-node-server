import { Controller, Get } from '@nestjs/common';
import { VPService } from './vp.service';

@Controller('vegetation-photo')
export class VPController {
  constructor(private readonly VPService: VPService) {}

  @Get()
  getHello(): string {
    return this.VPService.getHello();
  }
}
