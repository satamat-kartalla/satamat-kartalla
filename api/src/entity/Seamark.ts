import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Harbour } from './Harbour';

@Entity()
@ObjectType()
export class Seamark extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column('float')
  lat: number;

  @Field(() => Number)
  @Column('float')
  lng: number;

  @Field(() => Number)
  @Column('int')
  type: number;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  description: string;

  @Field(() => Harbour)
  @ManyToOne(
    () => Harbour,
    harbour => harbour.seamarks,
  )
  harbour: Harbour;
}
