import { ArgsType, Field } from '@nestjs/graphql';

import { FilterBandsInput } from './filter-bands.input';
import { PaginationArgs } from 'src/shared/pagination';

@ArgsType()
export class BandsArgs extends PaginationArgs {
  @Field(() => FilterBandsInput, { nullable: true })
  filter: FilterBandsInput;
}
