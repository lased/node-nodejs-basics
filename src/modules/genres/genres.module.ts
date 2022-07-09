import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';

@Module({
  providers: [GenresService, GenresResolver, ConfigService],
  exports: [GenresService],
})
export class GenresModule {}
