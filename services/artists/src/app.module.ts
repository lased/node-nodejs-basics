import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsService } from './services/artists.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Artist.name,
                schema: ArtistSchema,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [ArtistsService, AuthService],
})
export class AppModule {}
