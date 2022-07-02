import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';
import { BandResponse } from './band.interfaces';
import { Genre } from '../genres/genre.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseMember {
  @Field(() => String, { nullable: false })
  artist: string;

  @Field(() => String, { nullable: true })
  instrument: string;

  @Field(() => [String], { nullable: true })
  years: string[];
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseBand {
  @Field(() => String, { nullable: true })
  origin: string;

  @Field(() => String, { nullable: true })
  website: string;

  @Field(() => [ID], { nullable: true })
  genres: string[];

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class BandsPagination extends Pagination {
  @Field(() => [Band], { nullable: true })
  items: BandResponse[];
}

@ObjectType()
export class Member extends BaseMember {}

@ObjectType()
export class Band extends BaseBand {
  @Field()
  id: string;

  @Field(() => [Member], { nullable: true })
  members: Member[];
}

@ObjectType()
export class DeletedBand {
  @Field(() => Int, { nullable: true })
  deletedCount: number;

  @Field(() => Boolean, { nullable: true })
  acknowledged: boolean;
}
