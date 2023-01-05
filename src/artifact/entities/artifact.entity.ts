import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
