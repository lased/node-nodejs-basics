import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import axios from 'axios';

import { ArtistsModule } from './modules/artists/artists.module';
import { UsersModule } from './modules/users/users.module';
import { GraphQLError } from 'graphql';

const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: isProd ? '.env' : '.env.local',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !isProd,
      playground: !isProd,
      autoSchemaFile: true,
      formatError: (error) => {
        const err = error.originalError;

        if (axios.isAxiosError(err)) {
          return err.response.data as any;
        }

        return new GraphQLError(err.message);
      },
    }),
    ArtistsModule,
    UsersModule,
  ],
})
export class AppModule {}
