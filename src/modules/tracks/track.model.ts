import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';
import { TrackResponse } from './track.interfaces';
import { Genre } from '../genres/genre.model';
import { Band } from '../bands/band.model';
import { Artist } from '../artists/artist.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseTrack {
  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;
}

@ObjectType()
export class TracksPagination extends Pagination {
  @Field(() => [Track], { nullable: true })
  items: TrackResponse[];
}

@ObjectType()
export class Track extends BaseTrack {
  @Field()
  id: string;

  // @Field(() => Album)
  // albums: string;

  @Field(() => [Band], { nullable: true })
  bands: Band[];

  @Field(() => [Artist], { nullable: true })
  artists: Artist[];

  @Field(() => [Genre], { nullable: true })
  genres: Genre[];
}

@ObjectType()
export class DeletedTrack {
  @Field(() => Int, { nullable: true })
  deletedCount: number;

  @Field(() => Boolean, { nullable: true })
  acknowledged: boolean;
}
