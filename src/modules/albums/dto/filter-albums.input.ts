import { InputType, PartialType } from '@nestjs/graphql';

import { CreateAlbumInput } from './create-album.input';

@InputType()
export class FilterAlbumsInput extends PartialType(
  CreateAlbumInput,
  InputType,
) {}
