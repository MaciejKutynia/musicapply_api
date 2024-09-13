import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from '../entities/track.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  public async findAll(search: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const query = this.trackRepository.createQueryBuilder();
    if (search) {
      query.andWhere('artist LIKE :search OR name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [result, count] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    const tracks = result.map((track) => ({
      ...track,
      cover: `http://localhost:8000/media/${this.prepareName(
        track.id,
        track.name,
        track.artist,
        'webp',
      )}`,
    }));
    return { tracks, count };
  }

  public async getCover(id: number): Promise<TrackEntity> {
    return this.trackRepository.findOne({
      where: { id },
      select: ['cover'],
    });
  }

  public async findOne(id: number) {
    const { artist, name } = await this.trackRepository.findOne({
      where: { id },
    });
    return createReadStream(
      join(process.cwd(), this.prepareName(id, name, artist, 'mp3')),
    );
  }

  private prepareName(id: number, name: string, artist: string, ext: string) {
    return `${id}_${artist.toLowerCase().replaceAll(' ', '_')}_${name
      .toLowerCase()
      .replaceAll(' ', '_')}.${ext}`;
  }
}
