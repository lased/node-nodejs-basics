import { ArgsType, Field } from '@nestjs/graphql';

import { FilterGenresInput } from './filter-genres.input';
import { PaginationArgs } from 'src/shared/pagination';

@ArgsType()
export class GenresArgs extends PaginationArgs {
  @Field(() => FilterGenresInput, { nullable: true })
  filter: FilterGenresInput;
}
