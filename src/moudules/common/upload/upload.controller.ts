import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UFOService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UFOController {
  constructor(private readonly UFOService: UFOService) {}

  @Post('oss')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToOSS(@UploadedFile() file: Express.Multer.File) {
    // 处理上传的文件
    const res = await this.UFOService.uploadToOSS(file);
    console.log(res);
    return res;
  }
}
