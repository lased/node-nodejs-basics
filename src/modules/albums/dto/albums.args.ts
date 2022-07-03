import { ArgsType, Field } from '@nestjs/graphql';

import { FilterAlbumsInput } from './filter-albums.input';
import { PaginationArgs } from 'src/shared/pagination';

@ArgsType()
export class AlbumsArgs extends PaginationArgs {
  @Field(() => FilterAlbumsInput, { nullable: true })
  filter: FilterAlbumsInput;
}
