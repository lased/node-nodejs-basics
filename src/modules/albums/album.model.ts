import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Pagination } from 'src/shared/pagination/pagination.model';
import { AlbumResponse } from './album.interfaces';
import { Artist } from '../artists/artist.model';
import { Track } from '../tracks/track.model';
import { Genre } from '../genres/genre.model';
import { Band } from '../bands/band.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseAlbum {
  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class AlbumsPagination extends Pagination {
  @Field(() => [Album], { nullable: true })
  items: AlbumResponse[];
}

@ObjectType()
export class Album extends BaseAlbum {
  @Field(() => ID)
  id: string;

  @Field(() => [Artist], { nullable: true })
  artists: Artist[];

  @Field(() => [Band], { nullable: true })
  bands: Band[];

  @Field(() => [Track], { nullable: true })
  tracks: Track[];

  @Field(() => [Genre], { nullable: true })
  genres: Genre[];
}

@ObjectType()
export class DeletedAlbum {
  @Field(() => Int, { nullable: true })
  deletedCount: number;

  @Field(() => Boolean, { nullable: true })
  acknowledged: boolean;
}
