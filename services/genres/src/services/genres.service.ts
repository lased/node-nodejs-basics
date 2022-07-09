import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from '../schemas/genre.schema';
import { Model } from 'mongoose';

@Injectable()
export class GenresService {
    constructor(
        @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    ) {}

    async create(createGenreDto: any): Promise<Genre> {
        const createdCat = new this.genreModel(createGenreDto);
        return createdCat.save();
    }

    async delete(id: string): Promise<any> {
        return this.genreModel.deleteOne({ _id: id }).exec();
    }

    async findAll({ limit, offset }, filter): Promise<Genre[]> {
        return this.genreModel
            .find(filter)
            .limit(limit)
            .skip(limit * offset)
            .exec();
    }

    async findOne(id): Promise<Genre> {
        return this.genreModel.findById(id).exec();
    }

    async update(id, updateGenreDto: any): Promise<Genre> {
        return this.genreModel
            .findOneAndUpdate({ _id: id }, updateGenreDto, { new: true })
            .exec();
    }

    async count(filter): Promise<number> {
        return this.genreModel.count(filter).exec();
    }
}
