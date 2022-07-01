import { Module } from '@nestjs/common';

import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';

@Module({
  providers: [GenresService, GenresResolver],
})
export class GenresModule {}
