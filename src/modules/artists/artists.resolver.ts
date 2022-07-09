import {
  Args,
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
import { BandResponse } from '../bands/band.interfaces';
import { asyncQueries } from 'src/shared/asyncQueries';

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
  id(@Parent() artist: ArtistResponse) {
    return artist._id;
  }

  @ResolveField(() => [Band])
  bands(@Parent() artist: ArtistResponse) {
    return asyncQueries<BandResponse>(artist.bandsIds, (id) =>
      this.bandsService.getById(id),
    );
  }
}
