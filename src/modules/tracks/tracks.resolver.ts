import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Track, TracksPagination, DeletedTrack } from './track.model';
import { ArtistResponse } from '../artists/artist.interfaces';
import { UpdateTrackInput } from './dto/update-track.input';
import { CreateTrackInput } from './dto/create-track.input';
import { ArtistsService } from '../artists/artists.service';
import { GenreResponse } from '../genres/genre.interfaces';
import { GenresService } from '../genres/genres.service';
import { AlbumsService } from '../albums/albums.service';
import { BandResponse } from '../bands/band.interfaces';
import { asyncQueries } from 'src/shared/asyncQueries';
import { BandsService } from '../bands/bands.service';
import { TrackResponse } from './track.interfaces';
import { Artist } from '../artists/artist.model';
import { TracksService } from './tracks.service';
import { TracksArgs } from './dto/tracks.args';
import { Genre } from '../genres/genre.model';
import { Album } from '../albums/album.model';
import { Band } from '../bands/band.model';

@Resolver(() => Track)
export class TracksResolver {
  constructor(
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private genresService: GenresService,
    private bandsService: BandsService,
    private albumsService: AlbumsService,
  ) {}

  @Query(() => Track)
  track(@Args('id') id: string) {
    return this.tracksService.getById(id);
  }

  @Query(() => TracksPagination)
  tracks(@Args() args: TracksArgs) {
    return this.tracksService.getAll(args);
  }

  @Mutation(() => Track)
  createTrack(
    @Args('track', { type: () => CreateTrackInput, nullable: false })
    track: CreateTrackInput,
  ) {
    return this.tracksService.create(track);
  }

  @Mutation(() => Track)
  updateTrack(
    @Args('id') id: string,
    @Args('track', { type: () => UpdateTrackInput, nullable: false })
    track: UpdateTrackInput,
  ) {
    return this.tracksService.update(id, track);
  }

  @Mutation(() => DeletedTrack)
  deleteTrack(@Args('id') id: string) {
    return this.tracksService.delete(id);
  }

  @ResolveField()
  id(@Parent() track: TrackResponse) {
    return track._id;
  }

  @ResolveField(() => [Genre])
  genres(@Parent() track: TrackResponse) {
    return asyncQueries<GenreResponse>(track.genresIds, (id) =>
      this.genresService.getById(id),
    );
  }

  @ResolveField(() => [Band])
  bands(@Parent() track: TrackResponse) {
    return asyncQueries<BandResponse>(track.bandsIds, (id) =>
      this.bandsService.getById(id),
    );
  }

  @ResolveField(() => [Artist])
  artists(@Parent() track: TrackResponse) {
    return asyncQueries<ArtistResponse>(track.artistsIds, (id) =>
      this.artistsService.getById(id),
    );
  }

  @ResolveField(() => [Album])
  album(@Parent() track: TrackResponse) {
    return this.albumsService.getById(track.albumId);
  }
}
