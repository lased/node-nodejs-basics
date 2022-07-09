import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Band, BandDocument } from '../schemas/band.schema';
import { Model } from 'mongoose';
import { UpdateBandDto } from '../dto/update-band.dto';
import { CreateBandDto } from '../dto/create-band.dto';

@Injectable()
export class BandsService {
    constructor(
        @InjectModel(Band.name) private bandModel: Model<BandDocument>,
    ) {}

    async create(createBandDto: CreateBandDto): Promise<Band> {
        return new this.bandModel(createBandDto).save();
    }

    async delete(id: string): Promise<any> {
        return this.bandModel.deleteOne({ _id: id }).exec();
    }

    async findAll({ limit, offset }, filter): Promise<Band[]> {
        return this.bandModel
            .find(filter)
            .limit(limit)
            .skip(limit * offset)
            .exec();
    }

    async findOne(id): Promise<Band> {
        return this.bandModel.findById(id).exec();
    }

    async update(id, updateBandDto: UpdateBandDto): Promise<Band> {
        return this.bandModel
            .findOneAndUpdate({ _id: id }, updateBandDto, { new: true })
            .exec();
    }

    async count(filter): Promise<number> {
        return this.bandModel.count(filter).exec();
    }
}
