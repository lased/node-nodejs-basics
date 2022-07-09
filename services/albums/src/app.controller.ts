import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AlbumsService } from './services/albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './schemas/album.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from './auth/auth.guard';

interface PaginatedReponse<T> {
    items: T[];
    offset: number;
    limit: number;
    total: number;
}

@Controller('v1/albums')
export class AppController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Get()
    async all(@Query() query: any): Promise<PaginatedReponse<Album>> {
        const {
            limit: limitQueryParam,
            offset: offsetQueryParam,
            ...filter
        } = query;
        const limit = Number(limitQueryParam) || 5;
        const offset = Number(offsetQueryParam) || 0;

        return {
            items: await this.albumsService.findAll({ limit, offset }, filter),
            offset,
            limit,
            total: await this.albumsService.count(filter),
        };
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Album> {
        return this.albumsService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createGenreDto: CreateAlbumDto): Promise<Album> {
        return this.albumsService.create(createGenreDto);
    }

    @Put(':id/image')
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/uploads',
                filename: (req, file, callback) =>
                    callback(null, `${req.params.id}-${file.originalname}`),
            }),
        }),
    )
    updateImage(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ): any {
        console.log(file);
        return this.albumsService.updateImage(id, file);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateTrackDto: UpdateAlbumDto,
    ): Promise<Album> {
        return this.albumsService.update(id, updateTrackDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        console.log(id);
        return this.albumsService.delete(id);
    }
}
