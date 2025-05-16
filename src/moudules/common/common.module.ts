import { Module } from '@nestjs/common';
import { uploadModule } from './upload/upload.module';
import { CommonController } from './common.controller';
// 为公共模块添加前缀路径

@Module({
  imports: [uploadModule],
  controllers: [CommonController],
  exports: [uploadModule],
})
export class commonModule {}
