import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseAlbum } from '../album.model';

@InputType()
export class CreateAlbumInput extends BaseAlbum {
  @Field()
  name: string;

  @Field(() => [ID], { nullable: true })
  artists: string[];

  @Field(() => [ID], { nullable: true })
  bands: string[];

  @Field(() => [ID], { nullable: true })
  tracks: string[];

  @Field(() => [ID], { nullable: true })
  genres: string[];
}
