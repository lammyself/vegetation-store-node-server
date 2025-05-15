import {
  Controller,
  Get,
  Post,
  Query,
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

    return res;
  }
  @Get('getFilePath')
  getFilePath(@Query('filePath') filePath: string) {
    // 处理上传的文件
    const res = this.UFOService.getFilePath(filePath);

    return res;
  }
}
