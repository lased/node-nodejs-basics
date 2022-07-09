import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationInput } from './pagination.input';

@ArgsType()
export class PaginationArgs {
  @Field(() => PaginationInput, { nullable: true })
  pagination: PaginationInput;
}
