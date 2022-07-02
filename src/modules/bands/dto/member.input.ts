import { InputType } from '@nestjs/graphql';

import { BaseMember } from '../band.model';

@InputType()
export class MemberInput extends BaseMember {}
