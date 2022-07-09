import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    ) {}

    async create(createTrackDto: CreateTrackDto): Promise<Track> {
        return new this.trackModel(createTrackDto).save();
    }

    async delete(id: string): Promise<any> {
        return this.trackModel.deleteOne({ _id: id }).exec();
    }

    async findAll({ limit, offset }, filter): Promise<Track[]> {
        return this.trackModel
            .find(filter)
            .limit(limit)
            .skip(limit * offset)
            .exec();
    }

    async findOne(id): Promise<Track> {
        return this.trackModel.findById(id).exec();
    }

    async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
        return this.trackModel
            .findOneAndUpdate({ _id: id }, updateTrackDto, { new: true })
            .exec();
    }

    async count(filter): Promise<number> {
        return this.trackModel.count(filter).exec();
    }
}
