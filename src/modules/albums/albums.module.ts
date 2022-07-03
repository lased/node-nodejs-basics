import { Module } from '@nestjs/common';

import { ArtistsModule } from '../artists/artists.module';
import { GenresModule } from '../genres/genres.module';
import { TracksModule } from '../tracks/tracks.module';
import { BandsModule } from '../bands/bands.module';
import { AlbumsResolver } from './albums.resolver';
import { AlbumsService } from './albums.service';

@Module({
  imports: [GenresModule, ArtistsModule, BandsModule, TracksModule],
  providers: [AlbumsService, AlbumsResolver],
  exports: [AlbumsService],
})
export class AlbumsModule {}
