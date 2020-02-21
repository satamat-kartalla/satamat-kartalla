import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Harbour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lng: number;
}
