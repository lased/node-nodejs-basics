import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseTrack } from '../track.model';

@InputType()
export class CreateTrackInput extends BaseTrack {
  @Field()
  title: string;

  @Field(() => ID, { nullable: true })
  album: string;

  @Field(() => [ID], { nullable: true })
  bands: string[];

  @Field(() => [ID], { nullable: true })
  artists: string[];

  @Field(() => [ID], { nullable: true })
  genres: string[];
}
