import { InputType, PartialType } from '@nestjs/graphql';

import { CreateArtistInput } from './create-artist.input';

@InputType()
export class FilterArtistsInput extends PartialType(
  CreateArtistInput,
  InputType,
) {}
