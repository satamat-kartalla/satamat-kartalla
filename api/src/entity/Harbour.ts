import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Seamark } from './Seamark';

@Entity()
@ObjectType()
export class Harbour extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @Field(() => Number)
  @Column('float')
  lat: number;

  @Field(() => Number)
  @Column('float')
  lng: number;

  @Field(() => [Seamark])
  @OneToMany(
    () => Seamark,
    seamark => seamark.harbour,
  )
  seamarks: Seamark[];
}
