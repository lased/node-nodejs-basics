import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { GenresService } from '../genres/genres.service';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';

@Module({
  providers: [BandsService, BandsResolver, ConfigService, GenresService],
  exports: [BandsService],
})
export class BandsModule {}
