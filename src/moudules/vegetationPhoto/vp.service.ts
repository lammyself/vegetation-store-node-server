import { Injectable } from '@nestjs/common';
import { UFOService } from '../common/upload/upload.service'; // 导入服务
import { ConfigService } from '@nestjs/config';
import { ChatConfig, Ling } from '@bearbobo/ling';
import { visionPrompt } from 'src/lib/prompt.tpl';
@Injectable()
export class VPService {
  constructor(
    private readonly ufoService: UFOService,
    private readonly configService: ConfigService,
  ) {
    // 从环境变量获取月之暗面配置 MOONSHOT_KEY MOONSHOT_API MOONSHOT_MODEL
    const moonshotKey =
      this.configService.get<string | undefined>('MOONSHOT_KEY') || '';
    const moonshotApi =
      this.configService.get<string | undefined>('MOONSHOT_API') || '';
    const moonshotModel =
      this.configService.get<string | undefined>('MOONSHOT_MODEL') || '';
    // 创建月之暗面配置
    this.moonshotConfig = {
      moonshotKey,
      moonshotApi,
      moonshotModel,
    };
  }
  private moonshotConfig: {
    moonshotKey: string;
    moonshotApi: string;
    moonshotModel: string;
  }; // 声明一个私有变量
  async parse(filePath: string): Promise<string> {
    // 将图片下载到本地
    const imgFile = await this.ufoService.downloadFile(filePath);
    // 确保 buffer 是 Buffer 类型
    if (!Buffer.isBuffer(imgFile)) {
      throw new Error('Invalid img');
    }
    // 将图片转为base64
    const base64 = `data:image/png;base64,${imgFile.toString('base64')}`;

    return base64;
  }
  // 创建工作流
  createWorkflow(): Ling {
    // 创建工作流
    const chatConfig: ChatConfig = {
      api_key: this.moonshotConfig.moonshotKey,
      endpoint: this.moonshotConfig.moonshotApi,
      model_name: this.moonshotConfig.moonshotModel,
    };
    const ling = new Ling(chatConfig);
    // 返回工作流
    return ling;
  }
  //使用视觉模型解析图片特征
  async parsePhoto(
    imgBase64: string,
    workflow: Ling,
    userPrompt: string,
  ): Promise<string> {
    // 使用视觉模型解析图片特征
    const bot = workflow.createBot();
    bot.addPrompt(visionPrompt);
    await bot.chat([
      {
        type: 'image_url', // <-- 使用 image_url 类型来上传图片，内容为使用 base64 编码过的图片内容
        image_url: {
          url: imgBase64,
        },
      },
      {
        type: 'text',
        text: userPrompt || '图片中包含一棵植物', // <-- 使用 text 类型来提供文字指令，例如“描述图片内容”
      },
    ]);
    console.log('响应中间数据');
    bot.on('response', ({ uri, delta }) => {
      console.log("'bot response', uri, delta");
      console.log('bot response', uri, delta);
    });
    console.log('close');
    await workflow.close();
    return Promise.resolve(imgBase64);
  }
}
