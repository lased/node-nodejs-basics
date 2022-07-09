import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
