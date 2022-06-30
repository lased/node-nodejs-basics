import { InputType } from '@nestjs/graphql';

import { BaseArtist } from '../artist.model';

@InputType()
export class UpdateArtistInput extends BaseArtist {}
