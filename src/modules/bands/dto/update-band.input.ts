import { InputType, PartialType } from '@nestjs/graphql';

import { CreateBandInput } from './create-band.input';

@InputType()
export class UpdateBandInput extends PartialType(CreateBandInput, InputType) {}
