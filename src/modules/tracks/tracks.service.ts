import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { FilterTracksInput } from './dto/filter-tracks.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { CreateTrackInput } from './dto/create-track.input';
import { TrackResponse } from './track.interfaces';
import { TracksPagination } from './track.model';

@Injectable()
export class TracksService {
  private baseURL;
  private instance: AxiosInstance;

  constructor(
    @Inject(CONTEXT) { req: request }: { req: IncomingMessage },
    private configService: ConfigService,
  ) {
    this.baseURL = this.configService.get('TRACKS_API');
    this.instance = axios.create({ baseURL: this.baseURL });
    this.instance.interceptors.request.use((req) => {
      const receivedAuth = request.headers?.authorization;

      if (!req.headers.authorization && receivedAuth) {
        req.headers.authorization = receivedAuth;
      }

      return req;
    });
  }

  async getById(id: string) {
    const res = await this.instance.get<TrackResponse>(`/${id}`);

    return res.data || null;
  }

  async getAll(params: ParamsType<FilterTracksInput>) {
    const filter: Partial<TrackResponse> = {};

    if (params.filter?.album) {
      filter.albumId = params.filter.album;
      delete params.filter.album;
    }
    if (params.filter?.bands) {
      filter.bandsIds = params.filter.bands;
      delete params.filter.bands;
    }
    if (params.filter?.artists) {
      filter.artistsIds = params.filter.artists;
      delete params.filter.artists;
    }
    if (params.filter?.genres) {
      filter.genresIds = params.filter.genres;
      delete params.filter.genres;
    }

    const search = buildQueryParams({
      ...params,
      filter: { ...params.filter, ...filter },
    });
    const res = await this.instance.get<TracksPagination>(`/?${search}`);

    return res.data;
  }

  async create(data: CreateTrackInput) {
    const { genres, bands, artists, album, ...rest } = data;
    const res = await this.instance.post<TrackResponse>(`/`, {
      ...rest,
      albumId: album,
      bandsIds: bands,
      artistsIds: artists,
      genresIds: genres,
    });

    return res.data;
  }

  async update(id: string, data: UpdateTrackInput) {
    const { genres, bands, artists, album, ...rest } = data;
    const res = await this.instance.put<TrackResponse>(`/${id}`, {
      ...rest,
      albumId: album,
      bandsIds: bands,
      artistsIds: artists,
      genresIds: genres,
    });

    return res.data;
  }

  async delete(id: string) {
    const res = await this.instance.delete(`/${id}`);

    return res.data;
  }
}
