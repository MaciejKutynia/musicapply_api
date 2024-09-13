import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 12,
  ) {
    return this.trackService.findAll(search, page, limit);
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
