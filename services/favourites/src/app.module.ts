import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesService } from './services/favorites.service';
import { Favourite, FavouriteSchema } from './schemas/favourite.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Favourite.name,
                schema: FavouriteSchema,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [FavoritesService, AuthService],
})
export class AppModule {}
