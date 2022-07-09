import { InputType } from '@nestjs/graphql';

import { BasePagination } from './pagination.model';

@InputType()
export class PaginationInput extends BasePagination {}
