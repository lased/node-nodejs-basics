import { ArgsType, Field } from '@nestjs/graphql';

import { FilterTracksInput } from './filter-tracks.input';
import { PaginationArgs } from 'src/shared/pagination';

@ArgsType()
export class TracksArgs extends PaginationArgs {
  @Field(() => FilterTracksInput, { nullable: true })
  filter: FilterTracksInput;
}
