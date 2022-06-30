import { Field, InputType } from '@nestjs/graphql';

import { BaseArtist } from '../artist.model';

@InputType()
export class CreateArtistInput extends BaseArtist {
  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  country: string;
}
