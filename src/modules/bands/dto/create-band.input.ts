import { Field, InputType } from '@nestjs/graphql';

import { MemberInput } from './member.input';
import { BaseBand } from '../band.model';

@InputType()
export class CreateBandInput extends BaseBand {
  @Field(() => [MemberInput], { nullable: true })
  members: MemberInput[];
}
