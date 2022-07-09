import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    ) {}

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        return new this.albumModel(createAlbumDto).save();
    }

    async delete(id: string): Promise<any> {
        return this.albumModel.deleteOne({ _id: id }).exec();
    }

    async updateImage(id: string, file: Express.Multer.File): Promise<any> {
        const album = await this.albumModel.findOne({ _id: id }).exec();
        album.image = file.filename;
        return album.save();
    }

    async findAll({ limit, offset }, filter): Promise<Album[]> {
        return this.albumModel
            .find(filter)
            .limit(limit)
            .skip(limit * offset)
            .exec();
    }

    async findOne(id): Promise<Album> {
        return this.albumModel.findById(id).exec();
    }

    async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        return this.albumModel
            .findOneAndUpdate({ _id: id }, updateAlbumDto, { new: true })
            .exec();
    }

    async count(filter): Promise<number> {
        return this.albumModel.count(filter).exec();
    }
}
