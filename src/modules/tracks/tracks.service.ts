import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { GraphQLError } from 'graphql';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { FilterTracksInput } from './dto/filter-tracks.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { CreateTrackInput } from './dto/create-track.input';
import { TrackResponse } from './track.interfaces';
import { TracksPagination } from './track.model';

@Injectable()
export class TracksService {
  private baseURL = 'http://localhost:3006/v1/tracks';
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

    if (!res.data) {
      throw new GraphQLError('Track not found');
    }

    return res.data;
  }

  async getAll(params: ParamsType<FilterTracksInput>) {
    const { album, bands, artists, genres } = params.filter;
    const filter: Partial<TrackResponse> = {};

    if (album) {
      filter.albumId = album;
      delete params.filter.album;
    }
    if (bands) {
      filter.bandsIds = bands;
      delete params.filter.bands;
    }
    if (artists) {
      filter.artistsIds = artists;
      delete params.filter.artists;
    }
    if (genres) {
      filter.genresIds = genres;
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
