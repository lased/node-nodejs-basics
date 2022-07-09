import { IsString } from 'class-validator';

export class AddToFavouritesDto {
    @IsString()
    type: 'bands' | 'genres' | 'artists' | 'tracks';

    @IsString()
    id: string;
}
