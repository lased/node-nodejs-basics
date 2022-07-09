import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { FilterGenresInput } from './dto/filter-genres.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { CreateGenreInput } from './dto/create-genre.input';
import { GenreResponse } from './genre.interfaces';
import { GenresPagination } from './genre.model';

@Injectable()
export class GenresService {
  private baseURL;
  private instance: AxiosInstance;

  constructor(
    @Inject(CONTEXT) { req: request }: { req: IncomingMessage },
    private configService: ConfigService,
  ) {
    this.baseURL = this.configService.get('GENRES_API');
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
    const res = await this.instance.get<GenreResponse>(`/${id}`);

    return res.data || null;
  }

  async getAll(params: ParamsType<FilterGenresInput>) {
    const search = buildQueryParams(params);
    const res = await this.instance.get<GenresPagination>(`/?${search}`);

    return res.data;
  }

  async create(data: CreateGenreInput) {
    const res = await this.instance.post<GenreResponse>(`/`, data);

    return res.data;
  }

  async update(id: string, data: UpdateGenreInput) {
    const res = await this.instance.put<GenreResponse>(`/${id}`, data);

    return res.data;
  }

  async delete(id: string) {
    const res = await this.instance.delete(`/${id}`);

    return res.data;
  }
}
