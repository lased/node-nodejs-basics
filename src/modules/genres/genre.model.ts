import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';
import { GenreResponse } from './genre.interfaces';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseGenre {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => Int, { nullable: true })
  year: number;
}

@ObjectType()
export class GenresPagination extends Pagination {
  @Field(() => [Genre], { nullable: true })
  items: GenreResponse[];
}

@ObjectType()
export class Genre extends BaseGenre {
  @Field(() => ID)
  id: string;
}

@ObjectType()
export class DeletedGenre {
  @Field(() => Int, { nullable: true })
  deletedCount: number;

  @Field(() => Boolean, { nullable: true })
  acknowledged: boolean;
}
