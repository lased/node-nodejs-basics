import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Band, BandsPagination, DeletedBand } from './band.model';
import { GenreResponse } from '../genres/genre.interfaces';
import { UpdateBandInput } from './dto/update-band.input';
import { CreateBandInput } from './dto/create-band.input';
import { GenresService } from '../genres/genres.service';
import { asyncQueries } from 'src/shared/asyncQueries';
import { BandResponse } from './band.interfaces';
import { BandsService } from './bands.service';
import { Genre } from '../genres/genre.model';
import { BandsArgs } from './dto/bands.args';

@Resolver(() => Band)
export class BandsResolver {
  constructor(
    private genresService: GenresService,
    private bandsService: BandsService,
  ) {}

  @Query(() => Band)
  band(@Args('id') id: string) {
    return this.bandsService.getById(id);
  }

  @Query(() => BandsPagination)
  bands(@Args() args: BandsArgs) {
    return this.bandsService.getAll(args);
  }

  @Mutation(() => Band)
  createBand(
    @Args('band', { type: () => CreateBandInput, nullable: false })
    band: CreateBandInput,
  ) {
    return this.bandsService.create(band);
  }

  @Mutation(() => Band)
  updateBand(
    @Args('id') id: string,
    @Args('band', { type: () => UpdateBandInput, nullable: false })
    band: UpdateBandInput,
  ) {
    return this.bandsService.update(id, band);
  }

  @Mutation(() => DeletedBand)
  deleteBand(@Args('id') id: string) {
    return this.bandsService.delete(id);
  }

  @ResolveField()
  id(@Parent() band: BandResponse) {
    return band._id;
  }

  @ResolveField(() => [Genre])
  genres(@Parent() band: BandResponse) {
    return asyncQueries<GenreResponse>(band.genresIds, (id) =>
      this.genresService.getById(id),
    );
  }
}
