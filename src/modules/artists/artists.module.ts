import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ArtistsResolver } from './artists.resolver';
import { BandsModule } from '../bands/bands.module';
import { ArtistsService } from './artists.service';

@Module({
  imports: [BandsModule],
  providers: [ArtistsService, ArtistsResolver, ConfigService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
