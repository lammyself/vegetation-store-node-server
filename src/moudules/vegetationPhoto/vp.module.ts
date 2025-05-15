import { Module } from '@nestjs/common';
import { VPController } from './vp.controller';
import { VPService } from './vp.service';
@Module({
  imports: [],
  controllers: [VPController],
  providers: [VPService],
})
export class VegetationPhoto {}
