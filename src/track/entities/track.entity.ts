import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id?: number;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  readonly name: string;

  @Column({ type: 'varchar', length: 255, name: 'artist' })
  readonly artist: string;

  @Column({ type: 'decimal', name: 'rating' })
  readonly rating: number;

  @Column({ type: 'text', name: 'cover', nullable: true })
  readonly cover: string;
}
