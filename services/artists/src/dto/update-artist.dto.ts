import {
    IsArray,
    IsDate,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class UpdateArtistDto {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    secondName: string;

    @IsOptional()
    @IsString()
    middleName: string;

    @IsOptional()
    @Matches(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
    birthDate: string;

    @IsOptional()
    @IsString()
    birthPlace: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsArray()
    bandsIds: string[];

    @IsOptional()
    @IsArray()
    instruments: string[];
}
