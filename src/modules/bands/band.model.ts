import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';
import { BandResponse } from './band.interfaces';
import { Genre } from '../genres/genre.model';
import { Artist } from '../artists/artist.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseMember {
  @Field(() => String, { nullable: true })
  instrument: string;

  @Field(() => [Int], { nullable: true })
  years: number[];
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseBand {
  @Field(() => String, { nullable: true })
  origin: string;

  @Field(() => String, { nullable: true })
  website: string;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class BandsPagination extends Pagination {
  @Field(() => [Band], { nullable: true })
  items: BandResponse[];
}

@ObjectType()
export class Member extends BaseMember {
  @Field(() => Artist, { nullable: true })
  artist: Artist;
}

@ObjectType()
export class Band extends BaseBand {
  @Field(() => ID)
  id: string;

  @Field(() => [Member], { nullable: true })
  members: Member[];

  @Field(() => [Genre], { nullable: true })
  genres: Genre[];
}

@ObjectType()
export class DeletedBand {
  @Field(() => Int, { nullable: true })
  deletedCount: number;

  @Field(() => Boolean, { nullable: true })
  acknowledged: boolean;
}
