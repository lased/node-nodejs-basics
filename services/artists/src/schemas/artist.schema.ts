import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    secondName: string;

    @Prop()
    middleName: string;

    @Prop()
    birthDate: string;

    @Prop()
    birthPlace: string;

    @Prop({ required: true })
    country: string;

    @Prop()
    bandsIds: string[];

    @Prop()
    instruments: string[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
