import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { GenresModule } from '../genres/genres.module';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';

@Module({
  imports: [GenresModule],
  providers: [BandsService, BandsResolver, ConfigService],
  exports: [BandsService],
})
export class BandsModule {}
