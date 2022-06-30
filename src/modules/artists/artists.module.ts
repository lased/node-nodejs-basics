import { Module } from '@nestjs/common';

import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsService, ArtistsResolver],
})
export class ArtistsModule {}
