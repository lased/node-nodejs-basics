import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { UpdateArtistInput } from './dto/update-artist.input';
import { CreateArtistInput } from './dto/create-artist.input';
import { Artist, ArtistsPagination } from './artist.model';
import { ArtistResponse } from './artist.interfaces';

@Injectable()
export class ArtistsService {
  private baseURL = 'http://localhost:3002/v1/artists';
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
    const res = await this.instance.get<ArtistResponse>(`/${id}`);

    return res.data;
  }

  async getAll(params: ParamsType<Artist>) {
    const search = buildQueryParams(params);
    const res = await this.instance.get<ArtistsPagination>(`/?${search}`);

    return res.data;
  }

  async create(data: CreateArtistInput) {
    const res = await this.instance.post<ArtistResponse>(`/`, data);

    return res.data;
  }

  async update(id: string, data: UpdateArtistInput) {
    const res = await this.instance.put<ArtistResponse>(`/${id}`, data);

    return res.data;
  }

  async delete(id: string) {
    const res = await this.instance.delete(`/${id}`);

    return res.data;
  }
}
