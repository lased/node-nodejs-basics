import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseAlbum } from '../album.model';

@InputType()
export class CreateAlbumInput extends BaseAlbum {
  @Field()
  name: string;

  @Field(() => [ID], { nullable: true })
  artistsIds: string[];

  @Field(() => [ID], { nullable: true })
  bandsIds: string[];

  @Field(() => [ID], { nullable: true })
  trackIds: string[];

  @Field(() => [ID], { nullable: true })
  genresIds: string[];
}
