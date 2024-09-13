import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { Response } from 'express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':key')
  async getImage(
    @Param('key') key: string,
    @Res() res: Response,
    @Query('width') width: number,
    @Query('height') height: number,
  ) {
    const img_buffer = await this.mediaService.getMedia(key, width, height);
    res.set('Content-Type', 'image/webp');
    res.status(HttpStatus.OK).send(img_buffer);
  }
}
