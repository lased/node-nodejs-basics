import { ArgsType, Field } from '@nestjs/graphql';

import { FilterArtistsInput } from './filter-artists.input';
import { PaginationArgs } from 'src/shared/pagination';

@ArgsType()
export class ArtistsArgs extends PaginationArgs {
  @Field(() => FilterArtistsInput, { nullable: true })
  filter: FilterArtistsInput;
}
