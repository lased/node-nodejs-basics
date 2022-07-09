import { InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateBandInput } from './create-band.input';

@InputType()
export class FilterBandsInput extends PartialType(
  OmitType(CreateBandInput, ['members']),
  InputType,
) {}
