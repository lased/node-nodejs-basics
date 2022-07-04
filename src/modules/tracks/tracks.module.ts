import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { GenresService } from '../genres/genres.service';
import { BandsService } from '../bands/bands.service';
import { TracksResolver } from './tracks.resolver';
import { TracksService } from './tracks.service';

@Module({
  providers: [
    TracksService,
    TracksResolver,
    ConfigService,
    AlbumsService,
    GenresService,
    ArtistsService,
    BandsService,
  ],
  exports: [TracksService],
})
export class TracksModule {}
