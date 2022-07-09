import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    ) {}

    async create(createGenreDto: any): Promise<Artist> {
        const createdCat = new this.artistModel(createGenreDto);
        return createdCat.save();
    }

    async delete(id: string): Promise<any> {
        return this.artistModel.deleteOne({ _id: id }).exec();
    }

    async findAll({ limit, offset }, filter): Promise<Artist[]> {
        return this.artistModel
            .find(filter)
            .limit(limit)
            .skip(limit * offset)
            .exec();
    }

    async findOne(id): Promise<Artist> {
        return this.artistModel.findById(id).exec();
    }

    async update(id, updateArtistDto: UpdateArtistDto): Promise<Artist> {
        return this.artistModel
            .findOneAndUpdate({ _id: id }, updateArtistDto, { new: true })
            .exec();
    }

    async count(filter): Promise<number> {
        return this.artistModel.count(filter).exec();
    }
}
