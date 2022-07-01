import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

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
  @Field(() => [Genre])
  items: GenreResponse[];
}

@ObjectType()
export class Genre extends BaseGenre {
  @Field(() => String, { nullable: false })
  id: string;
}

@ObjectType()
export class DeletedGenre {
  @Field(() => Int)
  deletedCount: number;

  @Field()
  acknowledged: boolean;
}
