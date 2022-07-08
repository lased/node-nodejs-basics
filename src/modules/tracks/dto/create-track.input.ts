import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseTrack } from '../track.model';

@InputType()
export class CreateTrackInput extends BaseTrack {
  @Field()
  title: string;

  @Field(() => ID, { nullable: true })
  albumId: string;

  @Field(() => [ID], { nullable: true })
  bandsIds: string[];

  @Field(() => [ID], { nullable: true })
  artistsIds: string[];

  @Field(() => [ID], { nullable: true })
  genresIds: string[];
}
