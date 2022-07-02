import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Artist, ArtistsPagination, DeletedArtist } from './artist.model';
import { UpdateArtistInput } from './dto/update-artist.input';
import { CreateArtistInput } from './dto/create-artist.input';
import { BandsService } from '../bands/bands.service';
import { ArtistResponse } from './artist.interfaces';
import { ArtistsService } from './artists.service';
import { ArtistsArgs } from './dto/artists.args';
import { Band } from '../bands/band.model';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
    private bandsService: BandsService,
  ) {}

  @Query(() => Artist)
  artist(@Args('id') id: string) {
    return this.artistsService.getById(id);
  }

  @Query(() => ArtistsPagination)
  artists(@Args() args: ArtistsArgs) {
    return this.artistsService.getAll(args);
  }

  @Mutation(() => Artist)
  createArtist(
    @Args('artist', { type: () => CreateArtistInput, nullable: false })
    artist: CreateArtistInput,
  ) {
    return this.artistsService.create(artist);
  }

  @Mutation(() => Artist)
  updateArtist(
    @Args('id') id: string,
    @Args('artist', { type: () => UpdateArtistInput, nullable: false })
    artist: UpdateArtistInput,
  ) {
    return this.artistsService.update(id, artist);
  }

  @Mutation(() => DeletedArtist)
  deleteArtist(@Args('id') id: string) {
    return this.artistsService.delete(id);
  }

  @ResolveField()
  async id(@Parent() artist: ArtistResponse) {
    return artist._id;
  }

  @ResolveField(() => [Band])
  async bands(@Parent() artist: ArtistResponse) {
    const promises = [];

    artist.bandsIds.forEach((id) => {
      promises.push(() => this.bandsService.getById(id));
    });

    const result = await Promise.allSettled(promises.map((fn) => fn()));

    return result
      .filter((item) => item.status === 'fulfilled')
      .map((item: PromiseFulfilledResult<any>) => item.value);
  }
}
