import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { GraphQLError } from 'graphql';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { FilterAlbumsInput } from './dto/filter-albums.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { CreateAlbumInput } from './dto/create-album.input';
import { AlbumResponse } from './album.interfaces';
import { AlbumsPagination } from './album.model';

@Injectable()
export class AlbumsService {
  private baseURL;
  private instance: AxiosInstance;

  constructor(
    @Inject(CONTEXT) { req: request }: { req: IncomingMessage },
    private configService: ConfigService,
  ) {
    this.baseURL = this.configService.get('ALBUMS_API');
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
    const res = await this.instance.get<AlbumResponse>(`/${id}`);

    if (!res.data) {
      throw new GraphQLError('Album not found');
    }

    return res.data;
  }

  async getAll(params: ParamsType<FilterAlbumsInput>) {
    const { tracks, bands, artists, genres } = params.filter;
    const filter: Partial<AlbumResponse> = {};

    if (tracks) {
      filter.trackIds = tracks;
      delete params.filter.tracks;
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
    const res = await this.instance.get<AlbumsPagination>(`/?${search}`);

    return res.data;
  }

  async create(data: CreateAlbumInput) {
    const { genres, artists, bands, tracks, ...rest } = data;
    const res = await this.instance.post<AlbumResponse>(`/`, {
      ...rest,
      artistsIds: artists,
      bandsIds: bands,
      trackIds: tracks,
      genresIds: genres,
    });

    return res.data;
  }

  async update(id: string, data: UpdateAlbumInput) {
    const { genres, artists, bands, tracks, ...rest } = data;
    const res = await this.instance.put<AlbumResponse>(`/${id}`, {
      ...rest,
      artistsIds: artists,
      bandsIds: bands,
      trackIds: tracks,
      genresIds: genres,
    });

    return res.data;
  }

  async delete(id: string) {
    const res = await this.instance.delete(`/${id}`);

    return res.data;
  }
}
