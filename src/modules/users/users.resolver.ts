import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { UserResponse } from './user.interfaces';
import { UsersService } from './users.service';
import { User } from './users.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  user(@Args('id') id: string) {
    return this.usersService.getById(id);
  }

  @Query(() => String)
  jwt(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.jwt(email, password);
  }

  @Mutation(() => User)
  register(
    @Args('user', { type: () => CreateUserInput, nullable: false })
    user: CreateUserInput,
  ) {
    return this.usersService.register(user);
  }

  @ResolveField()
  async id(@Parent() user: UserResponse) {
    return user._id;
  }
}
