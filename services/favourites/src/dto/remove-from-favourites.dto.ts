import { IsString } from 'class-validator';

export class RemoveFromFavouritesDto {
    @IsString()
    type: 'band' | 'genre' | 'artist' | 'track';

    @IsString()
    id: string;
}
