import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async create(registerDto: RegisterDto): Promise<User> {
        const newUser = {
            ...registerDto,
            password: await bcrypt.hash(registerDto.password, 10),
        };
        const createdCat = new this.userModel(newUser);
        return createdCat.save();
    }

    async findOneById(id): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async login(loginDto: LoginDto): Promise<{ jwt: string }> {
        const user = await this.userModel
            .findOne({
                email: loginDto.email,
            })
            .exec();

        if (user) {
            const match = bcrypt.compare(loginDto.password, user.password);
            if (match) {
                return {
                    jwt: await this.jwtService.sign(
                        {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        },
                        {
                            secret: process.env.SECRET,
                        },
                    ),
                };
            }
        }
    }

    async verify(token) {
        return this.jwtService.verifyAsync(token, {
            secret: process.env.SECRET,
        });
    }
}
