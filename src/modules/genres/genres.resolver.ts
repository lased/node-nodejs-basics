import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Genre, GenresPagination, DeletedGenre } from './genre.model';
import { UpdateGenreInput } from './dto/update-genre.input';
import { CreateGenreInput } from './dto/create-genre.input';
import { GenresService } from './genres.service';
import { GenresArgs } from './dto/genres.args';
import { GenreResponse } from './genre.interfaces';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query(() => Genre)
  genre(@Args('id') id: string) {
    return this.genresService.getById(id);
  }

  @Query(() => GenresPagination)
  genres(@Args() args: GenresArgs) {
    return this.genresService.getAll(args);
  }

  @Mutation(() => Genre)
  createGenre(
    @Args('genre', { type: () => CreateGenreInput, nullable: false })
    genre: CreateGenreInput,
  ) {
    return this.genresService.create(genre);
  }

  @Mutation(() => Genre)
  updateGenre(
    @Args('id') id: string,
    @Args('genre', { type: () => UpdateGenreInput, nullable: false })
    genre: UpdateGenreInput,
  ) {
    return this.genresService.update(id, genre);
  }

  @Mutation(() => DeletedGenre)
  deleteGenre(@Args('id') id: string) {
    return this.genresService.delete(id);
  }

  @ResolveField()
  async id(@Parent() genre: GenreResponse) {
    return genre._id;
  }
}
