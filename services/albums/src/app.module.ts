import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsService } from './services/albums.service';
import { Album, AlbumSchema } from './schemas/album.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Album.name,
                schema: AlbumSchema,
            },
        ]),
        HttpModule,
    ],
    controllers: [AppController],
    providers: [AlbumsService, AuthService],
})
export class AppModule {}
