import { Field, ID, InputType } from '@nestjs/graphql';

import { MemberInput } from './member.input';
import { BaseBand } from '../band.model';

@InputType()
export class CreateBandInput extends BaseBand {
  @Field()
  name: string;

  @Field(() => [MemberInput], { nullable: true })
  members: MemberInput[];

  @Field(() => [ID], { nullable: true })
  genres: string[];
}
