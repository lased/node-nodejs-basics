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
import { TracksService } from './services/tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './schemas/track.schema';
import { AuthGuard } from './auth/auth.guard';

interface PaginatedReponse<T> {
    items: T[];
    offset: number;
    limit: number;
    total: number;
}

@Controller('v1/tracks')
export class AppController {
    constructor(private readonly tracksService: TracksService) {}

    @Get()
    async all(@Query() query: any): Promise<PaginatedReponse<Track>> {
        const { limit = 5, offset = 0, ...filter } = query;
        return {
            items: await this.tracksService.findAll({ limit, offset }, filter),
            limit,
            offset,
            total: await this.tracksService.count(filter),
        };;
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Track> {
        return this.tracksService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createGenreDto: CreateTrackDto): Promise<Track> {
        return this.tracksService.create(createGenreDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateTrackDto: UpdateTrackDto,
    ): Promise<Track> {
        return this.tracksService.update(id, updateTrackDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete(@Param('id') id): Promise<any> {
        return this.tracksService.delete(id);
    }
}
