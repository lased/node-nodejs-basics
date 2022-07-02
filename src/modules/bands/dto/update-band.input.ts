import { Field, InputType } from '@nestjs/graphql';

import { MemberInput } from './member.input';
import { BaseBand } from '../band.model';

@InputType()
export class UpdateBandInput extends BaseBand {
  @Field(() => [MemberInput], { nullable: true })
  members: MemberInput[];
}
