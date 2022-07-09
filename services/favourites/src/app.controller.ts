import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavouriteDocument } from './schemas/favourite.schema';
import { AddToFavouritesDto } from './dto/add-to-favourites.dto';
import { RemoveFromFavouritesDto } from './dto/remove-from-favourites.dto';
import { AuthGuard } from './auth/auth.guard';

@Controller('v1/favourites')
export class AppController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Put('add')
    @UseGuards(AuthGuard)
    addToFavourites(
        @Req() req,
        @Body() addToFavouritesDto: AddToFavouritesDto,
    ): Promise<FavouriteDocument> {
        const { _id: id } = req.user;
        return this.favoritesService.addToFavourites(id, addToFavouritesDto);
    }

    @Put('remove')
    @UseGuards(AuthGuard)
    removeFromFavourites(
        @Req() req,
        @Body() removeFromFavouritesDto: RemoveFromFavouritesDto,
    ): Promise<FavouriteDocument> {
        const { _id: id } = req.user;
        return this.favoritesService.removeFromFavourites(
            id,
            removeFromFavouritesDto,
        );
    }

    @Get()
    @UseGuards(AuthGuard)
    findOne(@Req() req): Promise<FavouriteDocument> {
        const { _id: id } = req.user;
        return this.favoritesService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<any> {
        return this.favoritesService.delete(id);
    }
}
