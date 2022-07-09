import { IsArray, IsOptional, IsString } from 'class-validator';
import { Member } from '../classes/member';

export class UpdateBandDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    origin: string;

    @IsArray()
    @IsOptional()
    members: Member[];

    @IsString()
    @IsOptional()
    website: string;

    @IsArray()
    @IsOptional()
    genresIds: string[];
}
