import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavouriteDocument = Favourite & Document;

@Schema()
export class Favourite {
    @Prop({ required: true })
    userId: string;

    @Prop()
    bandsIds: string[];

    @Prop()
    genresIds: string[];

    @Prop()
    artistsIds: string[];

    @Prop()
    tracksIds: string[];
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
