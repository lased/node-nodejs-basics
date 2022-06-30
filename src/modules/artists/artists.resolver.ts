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
import { CreateArtistInput } from './dto/create-artist.dto';
import { ArtistsService } from './artists.service';
import { ArtistsArgs } from './dto/artists.args';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(private artistsService: ArtistsService) {}

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
  async id(@Parent() artist: any) {
    return artist._id;
  }
}
