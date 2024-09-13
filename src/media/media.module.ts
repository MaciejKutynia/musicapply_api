import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';
import { TrackModule } from '../track/track.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TrackModule, HttpModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
