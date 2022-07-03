import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Album, AlbumsPagination, DeletedAlbum } from './album.model';
import { UpdateAlbumInput } from './dto/update-album.input';
import { CreateAlbumInput } from './dto/create-album.input';
import { GenresService } from '../genres/genres.service';
import { AlbumResponse } from './album.interfaces';
import { AlbumsService } from './albums.service';
import { Genre } from '../genres/genre.model';
import { AlbumsArgs } from './dto/albums.args';
import { asyncQueries } from 'src/shared/asyncQueries';
import { GenreResponse } from '../genres/genre.interfaces';
import { Artist } from '../artists/artist.model';
import { ArtistResponse } from '../artists/artist.interfaces';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { TracksService } from '../tracks/tracks.service';
import { Band } from '../bands/band.model';
import { BandResponse } from '../bands/band.interfaces';
import { Track } from '../tracks/track.model';
import { TrackResponse } from '../tracks/track.interfaces';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(
    private albumsService: AlbumsService,
    private genresService: GenresService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
    private tracksService: TracksService,
  ) {}

  @Query(() => Album)
  album(@Args('id') id: string) {
    return this.albumsService.getById(id);
  }

  @Query(() => AlbumsPagination)
  albums(@Args() args: AlbumsArgs) {
    return this.albumsService.getAll(args);
  }

  @Mutation(() => Album)
  createAlbum(
    @Args('album', { type: () => CreateAlbumInput, nullable: false })
    album: CreateAlbumInput,
  ) {
    return this.albumsService.create(album);
  }

  @Mutation(() => Album)
  updateAlbum(
    @Args('id') id: string,
    @Args('album', { type: () => UpdateAlbumInput, nullable: false })
    album: UpdateAlbumInput,
  ) {
    return this.albumsService.update(id, album);
  }

  @Mutation(() => DeletedAlbum)
  deleteAlbum(@Args('id') id: string) {
    return this.albumsService.delete(id);
  }

  @ResolveField()
  id(@Parent() album: AlbumResponse) {
    return album._id;
  }

  @ResolveField(() => [Genre])
  genres(@Parent() album: AlbumResponse) {
    return asyncQueries<GenreResponse>(album.genresIds, (id) =>
      this.genresService.getById(id),
    );
  }

  @ResolveField(() => [Artist])
  artists(@Parent() album: AlbumResponse) {
    return asyncQueries<ArtistResponse>(album.artistsIds, (id) =>
      this.artistsService.getById(id),
    );
  }

  @ResolveField(() => [Band])
  bands(@Parent() album: AlbumResponse) {
    return asyncQueries<BandResponse>(album.bandsIds, (id) =>
      this.bandsService.getById(id),
    );
  }

  @ResolveField(() => [Track])
  tracks(@Parent() album: AlbumResponse) {
    return asyncQueries<TrackResponse>(album.trackIds, (id) =>
      this.tracksService.getById(id),
    );
  }
}
