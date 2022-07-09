import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop({ required: true })
    title: string;

    @Prop()
    albumId: string;

    @Prop()
    bandsIds: string[];

    @Prop()
    artistsIds: string[];

    @Prop()
    duration: number;

    @Prop()
    released: number;

    @Prop()
    genresIds: string[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
