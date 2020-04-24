import { Resolver, Query, Arg, Mutation, InputType, Field } from 'type-graphql';
import { Seamark } from '../entity/Seamark';
import { getRepository } from 'typeorm';

@InputType({ description: 'New Seamark data' })
class AddSeamarkInput implements Partial<Seamark> {
  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  type: number;

  @Field()
  description: string;
}

@Resolver(() => Seamark)
export class SeamarkResolver {
  repository = getRepository(Seamark);

  @Query(() => [Seamark])
  seamarks(): Promise<Seamark[]> {
    return Seamark.find();
  }

  @Query(() => Seamark)
  seamark(@Arg('id') id: string): Promise<Seamark | undefined> {
    return Seamark.findOne({ where: { id } });
  }

  @Mutation(() => Seamark)
  async addSeamark(
    @Arg('seamark') newSeamarkData: AddSeamarkInput,
  ): Promise<Seamark> {
    const seamark = new Seamark();
    seamark.lat = newSeamarkData.lat;
    seamark.lng = newSeamarkData.lng;
    seamark.description = newSeamarkData.description;
    seamark.type = newSeamarkData.type;
    await this.repository.save(seamark);
    return seamark;
  }
}
