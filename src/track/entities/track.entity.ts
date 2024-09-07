import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id?: number;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  readonly name: string;

  @Column({ type: 'varchar', length: 255, name: 'artist' })
  readonly artist: string;

  @Column({ type: 'decimal', name: 'rating' })
  readonly rating: number;
}
