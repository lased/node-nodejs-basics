import { Field, InputType } from '@nestjs/graphql';

import { BaseGenre } from '../genre.model';

@InputType()
export class CreateGenreInput extends BaseGenre {
  @Field()
  name: string;
}
