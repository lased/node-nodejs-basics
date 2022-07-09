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
import { FavouritesResponse } from './favourite.interfaces';
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
import { Favourites } from './favourite.model';

@Resolver(() => Favourites)
export class FavouritesResolver {
  constructor(
    private favouritesService: FavouritesService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
    private tracksService: TracksService,
    private bandsService: BandsService,
    private usersService: UsersService,
  ) {}

  @Query(() => Favourites)
  favourites() {
    return this.favouritesService.favourites();
  }

  @Mutation(() => Favourites)
  addTrackToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('tracks', id);
  }

  @Mutation(() => Favourites)
  addBandToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('bands', id);
  }

  @Mutation(() => Favourites)
  addArtistToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('artists', id);
  }

  @Mutation(() => Favourites)
  addGenreToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.add('genres', id);
  }

  @Mutation(() => Favourites)
  removeTrackToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('tracks', id);
  }

  @Mutation(() => Favourites)
  removeBandToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('bands', id);
  }

  @Mutation(() => Favourites)
  removeArtistToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('artists', id);
  }

  @Mutation(() => Favourites)
  removeGenreToFavourites(
    @Args('id', { type: () => ID, nullable: false }) id: string,
  ) {
    return this.favouritesService.remove('genres', id);
  }

  @ResolveField()
  id(@Parent() favourite: FavouritesResponse) {
    return favourite._id;
  }

  @ResolveField(() => [Genre])
  genres(@Parent() favourite: FavouritesResponse) {
    return asyncQueries<GenreResponse>(favourite.genresIds, (id) =>
      this.genresService.getById(id),
    );
  }

  @ResolveField(() => [Band])
  bands(@Parent() favourite: FavouritesResponse) {
    return asyncQueries<BandResponse>(favourite.bandsIds, (id) =>
      this.bandsService.getById(id),
    );
  }

  @ResolveField(() => [Artist])
  artists(@Parent() favourite: FavouritesResponse) {
    return asyncQueries<ArtistResponse>(favourite.artistsIds, (id) =>
      this.artistsService.getById(id),
    );
  }

  @ResolveField(() => [Track])
  tracks(@Parent() favourite: FavouritesResponse) {
    return asyncQueries<TrackResponse>(favourite.tracksIds, (id) =>
      this.tracksService.getById(id),
    );
  }

  @ResolveField(() => [User])
  async user(@Parent() favourite: FavouritesResponse) {
    const user = await this.usersService.getById(favourite.userId);

    return user || null;
  }
}
