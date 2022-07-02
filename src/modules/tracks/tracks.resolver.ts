import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Track, TracksPagination, DeletedTrack } from './track.model';
import { UpdateTrackInput } from './dto/update-track.input';
import { CreateTrackInput } from './dto/create-track.input';
import { GenresService } from '../genres/genres.service';
import { TrackResponse } from './track.interfaces';
import { TracksService } from './tracks.service';
import { Genre } from '../genres/genre.model';
import { TracksArgs } from './dto/tracks.args';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { Band } from '../bands/band.model';
import { Artist } from '../artists/artist.model';

@Resolver(() => Track)
export class TracksResolver {
  constructor(
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private genresService: GenresService,
    private bandsService: BandsService,
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
  async genres(@Parent() track: TrackResponse) {
    const promises = [];

    track.genresIds.forEach((id) => {
      promises.push(() => this.genresService.getById(id));
    });

    const result = await Promise.allSettled(promises.map((fn) => fn()));

    return result
      .filter((item) => item.status === 'fulfilled')
      .map((item: PromiseFulfilledResult<any>) => item.value);
  }

  @ResolveField(() => [Band])
  async bands(@Parent() track: TrackResponse) {
    const promises = [];

    track.bandsIds.forEach((id) => {
      promises.push(() => this.bandsService.getById(id));
    });

    const result = await Promise.allSettled(promises.map((fn) => fn()));

    return result
      .filter((item) => item.status === 'fulfilled')
      .map((item: PromiseFulfilledResult<any>) => item.value);
  }

  @ResolveField(() => [Artist])
  async artists(@Parent() track: TrackResponse) {
    const promises = [];

    track.artistsIds.forEach((id) => {
      promises.push(() => this.artistsService.getById(id));
    });

    const result = await Promise.allSettled(promises.map((fn) => fn()));

    return result
      .filter((item) => item.status === 'fulfilled')
      .map((item: PromiseFulfilledResult<any>) => item.value);
  }
}
