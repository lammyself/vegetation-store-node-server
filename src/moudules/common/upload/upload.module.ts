import { Module } from '@nestjs/common';
import { UFOController } from './upload.controller';
import { UFOService } from './upload.service';
@Module({
  imports: [],
  controllers: [UFOController],
  providers: [UFOService],
  exports: [UFOService],
})
export class uploadModule {}
