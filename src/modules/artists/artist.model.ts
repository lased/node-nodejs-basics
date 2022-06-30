import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseArtist {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  secondName: string;

  @Field(() => String, { nullable: true })
  middleName: string;

  @Field(() => String, { nullable: true })
  birthDate: string;

  @Field(() => String, { nullable: true })
  birthPlace: string;

  @Field(() => String, { nullable: true })
  country: string;

  // @Field(() => [String])
  // bands: string[];

  // @Field(() => [String])
  // instruments: string[];
}

@ObjectType()
export class ArtistsPagination extends Pagination {
  @Field(() => [Artist])
  items: Artist[];
}

@ObjectType()
export class Artist extends BaseArtist {
  @Field(() => String, { nullable: false })
  id: string;
}

@ObjectType()
export class DeletedArtist {
  @Field(() => Int)
  deletedCount: number;

  @Field()
  acknowledged: boolean;
}
