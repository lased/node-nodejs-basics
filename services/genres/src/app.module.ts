import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresService } from './services/genres.service';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Genre.name,
                schema: GenreSchema,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [GenresService, AuthService],
})
export class AppModule {}
