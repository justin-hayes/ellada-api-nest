import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classification } from '../../classification/entities/classification.entity';
import { Tag } from '../../tag/entities/tag.entity';

export type Period = 'Archaic' | 'Classical' | 'Hellenistic';

@Entity()
export class Artifact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  extId: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  period: string;

  @Column()
  date: string;

  @Column({ type: 'integer' })
  beginDate: number;

  @Column({ type: 'integer' })
  endDate: number;

  @Column({ type: 'uuid', unique: true })
  imageId: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Classification)
  @JoinTable()
  classifications: Classification[];
}
