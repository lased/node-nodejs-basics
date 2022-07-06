import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Member } from './band.model';
import { ArtistsService } from '../artists/artists.service';
import { MemberInput } from './dto/member.input';
import { Artist } from '../artists/artist.model';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private artistsService: ArtistsService) {}

  @ResolveField(() => Artist)
  artist(@Parent() member: MemberInput) {
    return this.artistsService.getById(member.artist);
  }
}
