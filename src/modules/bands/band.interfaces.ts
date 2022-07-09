import { Member } from './band.model';

export interface BandResponse {
  _id: string;
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genresIds: string[];
}
