import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
