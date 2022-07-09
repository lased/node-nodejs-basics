import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BasePagination {
  @Field(() => Int, { nullable: true })
  offset: number;

  @Field(() => Int, { nullable: true })
  limit: number;
}

@ObjectType()
export class Pagination extends BasePagination {
  @Field(() => Int, { nullable: true })
  total: number;
}
