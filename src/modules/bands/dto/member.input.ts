import { ID, InputType, Field } from '@nestjs/graphql';

import { BaseMember } from '../band.model';

@InputType()
export class MemberInput extends BaseMember {
  @Field(() => ID)
  artistId: string;
}
