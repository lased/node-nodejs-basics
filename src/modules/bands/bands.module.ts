import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { MemberResolver } from './member.resolver';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';

@Module({
  providers: [
    BandsService,
    BandsResolver,
    MemberResolver,
    ConfigService,
    GenresService,
    ArtistsService,
  ],
  exports: [BandsService],
})
export class BandsModule {}
