import { InputType } from '@nestjs/graphql';

import { BaseUser } from '../users.model';

@InputType()
export class CreateUserInput extends BaseUser {}
