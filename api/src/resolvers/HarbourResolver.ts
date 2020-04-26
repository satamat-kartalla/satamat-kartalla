import { Resolver, Query, Arg, Mutation, InputType, Field } from 'type-graphql';
import { Harbour } from '../entity/Harbour';
import { getRepository } from 'typeorm';

@InputType({ description: 'New harbour data' })
class AddHarbourInput implements Partial<Harbour> {
  @Field()
  name: string;

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  description: string;
}

@Resolver(() => Harbour)
export class HarbourResolver {
  repository = getRepository(Harbour);

  @Query(() => [Harbour])
  harbours(): Promise<Harbour[]> {
    return Harbour.find();
  }

  @Query(() => Harbour)
  harbour(@Arg('id') id: string): Promise<Harbour | undefined> {
    return Harbour.findOne({ where: { id } });
  }

  @Mutation(() => Harbour)
  async addHarbour(
    @Arg('harbour') newHarbourData: AddHarbourInput,
  ): Promise<Harbour> {
    const harbour = new Harbour();
    harbour.name = newHarbourData.name;
    harbour.lat = newHarbourData.lat;
    harbour.lng = newHarbourData.lng;
    harbour.description = newHarbourData.description;
    await this.repository.save(harbour);
    return harbour;
  }
}
