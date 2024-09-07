import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    return this.trackService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const track = await this.trackService.findOne(+id);

    res.set({
      'Content-Type': 'audio/mpeg',
    });
    track.pipe(res);
  }
}
