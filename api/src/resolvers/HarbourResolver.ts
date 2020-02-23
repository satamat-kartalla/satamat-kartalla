import { Resolver, Query, Arg } from 'type-graphql';
import { Harbour } from '../entity/Harbour';

@Resolver()
export class HarbourResolver {
  @Query(() => [Harbour])
  getHarbours() {
    return Harbour.find();
  }

  @Query(() => Harbour)
  getHarbour(@Arg('id') id: string) {
    return Harbour.findOne({ where: { id } });
  }
}
