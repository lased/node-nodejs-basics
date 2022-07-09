import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { BandsService } from '../bands/bands.service';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsService, ArtistsResolver, ConfigService, BandsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
