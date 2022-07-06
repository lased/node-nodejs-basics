import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ArtistsService } from '../artists/artists.service';
import { FavouritesResolver } from './favourites.resolver';
import { GenresService } from '../genres/genres.service';
import { FavouritesService } from './favourites.service';
import { TracksService } from '../tracks/tracks.service';
import { BandsService } from '../bands/bands.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [
    FavouritesService,
    FavouritesResolver,
    ConfigService,
    TracksService,
    GenresService,
    ArtistsService,
    BandsService,
    UsersService,
  ],
  exports: [FavouritesService],
})
export class FavouritesModule {}
