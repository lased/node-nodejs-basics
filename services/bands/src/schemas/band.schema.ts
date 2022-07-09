import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Member } from '../classes/member';

export type BandDocument = Band & Document;

@Schema()
export class Band {
    @Prop({ required: true })
    name: string;

    @Prop()
    origin: string;

    @Prop()
    members: Member[];

    @Prop()
    website: string;

    @Prop()
    genresIds: string[];
}

export const BandSchema = SchemaFactory.createForClass(Band);
