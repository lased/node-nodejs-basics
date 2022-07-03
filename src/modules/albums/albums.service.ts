import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { FilterAlbumsInput } from './dto/filter-albums.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { CreateAlbumInput } from './dto/create-album.input';
import { AlbumResponse } from './album.interfaces';
import { AlbumsPagination } from './album.model';

@Injectable()
export class AlbumsService {
  private baseURL = 'http://localhost:3003/v1/bands';
  private instance: AxiosInstance;

  constructor(@Inject(CONTEXT) { req: request }: { req: IncomingMessage }) {
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

    return res.data;
  }

  async getAll(params: ParamsType<FilterAlbumsInput>) {
    const search = buildQueryParams(params);
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
