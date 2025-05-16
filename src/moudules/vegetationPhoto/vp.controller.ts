import { Controller, Get, Query } from '@nestjs/common';
import { VPService } from './vp.service';

@Controller('vegetation-photo')
export class VPController {
  constructor(private readonly VPService: VPService) {}

  @Get('parse')
  async parse(
    @Query('filePath') filePath: string,
    @Query('prompt') prompt: string,
  ) {
    // 处理上传的文件
    const res = await this.VPService.parse(filePath);
    // 创建工作流
    const workflow = this.VPService.createWorkflow();
    // 使用视觉模型解析
    const result = this.VPService.parsePhoto(res, workflow, prompt);
    return res;
  }
}
