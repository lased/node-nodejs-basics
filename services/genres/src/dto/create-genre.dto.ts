import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGenreDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsOptional()
    country: string;

    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    year: string;
}
