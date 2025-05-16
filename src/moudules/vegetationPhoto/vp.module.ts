import { Module } from '@nestjs/common';
import { VPController } from './vp.controller';
import { VPService } from './vp.service';
import { uploadModule } from '../common/upload/upload.module'; // 导入模块

@Module({
  imports: [uploadModule],
  controllers: [VPController],
  providers: [VPService],
})
export class VegetationPhoto {}
