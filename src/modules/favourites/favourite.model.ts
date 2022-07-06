import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Artist } from '../artists/artist.model';
import { Genre } from '../genres/genre.model';
import { Track } from '../tracks/track.model';
import { User } from '../users/users.model';
import { Band } from '../bands/band.model';

@ObjectType()
export class Favourite {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => [Band], { nullable: true })
  bands: Band[];

  @Field(() => [Artist], { nullable: true })
  artists: Artist[];

  @Field(() => [Genre], { nullable: true })
  genres: Genre[];

  @Field(() => [Track], { nullable: true })
  tracks: Track[];
}
