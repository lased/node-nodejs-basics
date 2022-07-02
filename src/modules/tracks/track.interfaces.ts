export interface TrackResponse {
  _id: string;
  title: string;
  albumId: string;
  bandsIds: string[];
  artistsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}
