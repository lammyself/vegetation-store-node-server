import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { VegetationPhoto } from './moudules/vegetationPhoto/vp.module';
import { commonModule } from './moudules/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 启用环境变量配置
      envFilePath: '.env.local', // 指定.env文件路径
      isGlobal: true, // 可选：将 ConfigModule 设为全局可用
    }),
    VegetationPhoto,
    commonModule,
  ],
})
export class AppModule {}
