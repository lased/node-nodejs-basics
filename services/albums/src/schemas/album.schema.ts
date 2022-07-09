import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop({ required: true })
    name: string;

    @Prop()
    released: number;

    @Prop()
    artistsIds: string[];

    @Prop()
    bandsIds: string[];

    @Prop()
    trackIds: string[];

    @Prop()
    genresIds: string[];

    @Prop()
    image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
