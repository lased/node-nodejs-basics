import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseUser {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@ObjectType()
export class User extends BaseUser {
  @Field()
  id: string;
}
