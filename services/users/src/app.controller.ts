import {
    Body,
    Controller,
    Get,
    Headers,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './services/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('v1/users')
export class AppController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ jwt: string }> {
        return this.usersService.login(loginDto);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.usersService.findOneById(id);
    }

    @Post('verify')
    async create(@Headers() headers): Promise<User> {
        try {
            const token = (
                headers['Authorization'] ||
                headers['authorization'] ||
                ''
            ).split(' ')[1];
            return await this.usersService.verify(token);
        } catch (err) {
            switch (err.message) {
                case 'invalid token':
                case 'jwt must be provided':
                    throw new UnauthorizedException();
                default:
                    throw new HttpException(
                        err.message,
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
            }
        }
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<User> {
        return this.usersService.create(registerDto);
    }
}
