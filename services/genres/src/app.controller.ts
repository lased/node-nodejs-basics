import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { GenresService } from './services/genres.service';
import { Genre } from './schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AuthGuard } from './auth/auth.guard';

interface PaginatedReponse<T> {
    items: T[];
    offset: number;
    limit: number;
    total: number;
}

@Controller('v1/genres')
export class AppController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    async all(@Query() query: any): Promise<PaginatedReponse<Genre>> {
        const { limit = 5, offset = 0, ...filter } = query;
        return {
            items: await this.genresService.findAll({ limit, offset }, filter),
            limit,
            offset,
            total: await this.genresService.count(filter),
        };
    }

    @Get(':id')
    getById(@Param() params): Promise<Genre> {
        return this.genresService.findOne(params.id);
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
        return this.genresService.create(createGenreDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
        return this.genresService.update(id, updateGenreDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete(@Param() params): Promise<Genre> {
        return this.genresService.delete(params.id);
    }
}
