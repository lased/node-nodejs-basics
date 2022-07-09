import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddToFavouritesDto } from '../dto/add-to-favourites.dto';
import { Favourite, FavouriteDocument } from '../schemas/favourite.schema';
import { RemoveFromFavouritesDto } from '../dto/remove-from-favourites.dto';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favourite.name)
        private favouritesModel: Model<FavouriteDocument>,
    ) {}

    async addToFavourites(
        userId: string,
        addToFavouritesDto: AddToFavouritesDto,
    ): Promise<FavouriteDocument> {
        let favourites = await this.favouritesModel.findOne({ userId }).exec();

        if (!favourites) {
            favourites = await new this.favouritesModel({
                userId,
                artistsIds: [],
                bandsIds: [],
                genresIds: [],
                tracksIds: [],
            });
        }
        favourites[`${addToFavouritesDto.type}Ids`].push(addToFavouritesDto.id);
        favourites[`${addToFavouritesDto.type}Ids`] = [
            ...new Set(favourites[`${addToFavouritesDto.type}Ids`]),
        ];
        return favourites.save();
    }

    async removeFromFavourites(
        userId: string,
        removeFromFavouritesDto: RemoveFromFavouritesDto,
    ): Promise<FavouriteDocument> {
        const favourites = await this.favouritesModel
            .findOne({ userId })
            .exec();
        if (favourites) {
            favourites[`${removeFromFavouritesDto.type}Ids`] = favourites[
                `${removeFromFavouritesDto.type}Ids`
            ].filter((item) => item !== removeFromFavouritesDto.id);
            return favourites.save();
        }
    }

    async findOne(userId: string): Promise<FavouriteDocument> {
        return this.favouritesModel.findOne({ userId });
    }

    async delete(id: string): Promise<FavouriteDocument> {
        console.log(id);
        return this.favouritesModel.findByIdAndDelete(id).exec();
    }
}
