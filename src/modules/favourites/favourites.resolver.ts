import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ArtistResponse } from '../artists/artist.interfaces';
import { ArtistsService } from '../artists/artists.service';
import { GenreResponse } from '../genres/genre.interfaces';
import { FavouriteResponse } from './favourite.interfaces';
import { TrackResponse } from '../tracks/track.interfaces';
import { GenresService } from '../genres/genres.service';
import { FavouritesService } from './favourites.service';
import { TracksService } from '../tracks/tracks.service';
import { BandResponse } from '../bands/band.interfaces';
import { asyncQueries } from 'src/shared/asyncQueries';
import { BandsService } from '../bands/bands.service';
import { UsersService } from '../users/users.service';
import { Artist } from '../artists/artist.model';
import { Genre } from '../genres/genre.model';
import { Track } from '../tracks/track.model';
import { Band } from '../bands/band.model';
import { User } from '../users/users.model';
import { Favourite } from './favourite.model';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(
    private favouritesService: FavouritesService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
    private tracksService: TracksService,
    private bandsService: BandsService,
    private usersService: UsersService,
  ) {}

  @Query(() => Favourite)
  favourites() {
    return this.favouritesService.favourites();
  }

  @Mutation(() => Favourite)
  addTrackToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('tracks', id);
  }

  @Mutation(() => Favourite)
  addBandToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('bands', id);
  }

  @Mutation(() => Favourite)
  addArtistToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('artists', id);
  }

  @Mutation(() => Favourite)
  addGenreToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('genres', id);
  }

  @Mutation(() => Favourite)
  removeTrackToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('tracks', id);
  }

  @Mutation(() => Favourite)
  removeBandToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('bands', id);
  }

  @Mutation(() => Favourite)
  removeArtistToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('artists', id);
  }

  @Mutation(() => Favourite)
  removeGenreToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('genres', id);
  }

  @ResolveField()
  id(@Parent() favourite: FavouriteResponse) {
    return favourite._id;
  }

  @ResolveField(() => [Genre])
  genres(@Parent() favourite: FavouriteResponse) {
    return asyncQueries<GenreResponse>(favourite.genresIds, (id) =>
      this.genresService.getById(id),
    );
  }

  @ResolveField(() => [Band])
  bands(@Parent() favourite: FavouriteResponse) {
    return asyncQueries<BandResponse>(favourite.bandsIds, (id) =>
      this.bandsService.getById(id),
    );
  }

  @ResolveField(() => [Artist])
  artists(@Parent() favourite: FavouriteResponse) {
    return asyncQueries<ArtistResponse>(favourite.artistsIds, (id) =>
      this.artistsService.getById(id),
    );
  }

  @ResolveField(() => [Track])
  tracks(@Parent() favourite: FavouriteResponse) {
    return asyncQueries<TrackResponse>(favourite.tracksIds, (id) =>
      this.tracksService.getById(id),
    );
  }

  @ResolveField(() => [User])
  async user(@Parent() favourite: FavouriteResponse) {
    const user = await this.usersService.getById(favourite.userId);

    return user || null;
  }
}
