import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BandsService } from './services/bands.service';
import { Band, BandSchema } from './schemas/band.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
                name: Band.name,
                schema: BandSchema,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [BandsService, AuthService],
})
export class AppModule {}
