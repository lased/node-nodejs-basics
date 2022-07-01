import { InputType } from '@nestjs/graphql';

import { BaseGenre } from '../genre.model';

@InputType()
export class FilterGenresInput extends BaseGenre {}
