import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';
import { ArtistResponse } from './artist.interfaces';

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
  @Field(() => [Artist], { nullable: true })
  items: ArtistResponse[];
}

@ObjectType()
export class Artist extends BaseArtist {
  @Field()
  id: string;
}

@ObjectType()
export class DeletedArtist {
  @Field(() => Int, { nullable: true })
  deletedCount: number;

  @Field(() => Boolean, { nullable: true })
  acknowledged: boolean;
}
