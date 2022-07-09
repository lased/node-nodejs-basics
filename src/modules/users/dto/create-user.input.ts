import { Field, InputType } from '@nestjs/graphql';

import { BaseUser } from '../users.model';

@InputType()
export class CreateUserInput extends BaseUser {
  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
