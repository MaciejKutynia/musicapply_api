import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../entities/track.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  public async findAll(where: string) {
    const query = this.trackRepository.createQueryBuilder('track');
    if (where) {
      query.andWhere('artist LIKE :where OR name LIKE :where', {
        where: `%${where}%`,
      });
    }
    const [tracks, count] = await query.getManyAndCount();
    return { tracks, count };
  }

  public async findOne(id: number) {
    const { artist, name } = await this.trackRepository.findOne({
      where: { id },
    });
    return createReadStream(
      join(
        process.cwd(),
        `${id}_${artist.toLowerCase().replaceAll(' ', '_')}_${name
          .toLowerCase()
          .replaceAll(' ', '_')}.mp3`,
      ),
    );
  }
}
