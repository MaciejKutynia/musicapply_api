import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { TrackService } from '../../track/services/track.service';
import * as sharp from 'sharp';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MediaService {
  constructor(
    private readonly trackService: TrackService,
    private readonly httpService: HttpService,
  ) {}

  public async getMedia(key: string, width?: number, height?: number) {
    const id = Number(key?.split('_')?.[0]);
    const { cover } = await this.trackService.getCover(id);
    const res = await firstValueFrom(
      this.httpService
        .get(cover, { responseType: 'arraybuffer' })
        .pipe(map((res) => res.data)),
    );
    return this.changeImageToWebp(res, width, height);
  }

  private changeImageToWebp(body: Buffer, width?: number, height?: number) {
    if (width && height) {
      return sharp(body).resize(width, height).webp().toBuffer();
    }
    return sharp(body).webp().toBuffer();
  }
}
