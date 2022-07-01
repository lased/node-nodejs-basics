import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { UpdateGenreInput } from './dto/update-genre.input';
import { CreateGenreInput } from './dto/create-genre.input';
import { Genre, GenresPagination } from './genre.model';
import { GenreResponse } from './genre.interfaces';

@Injectable()
export class GenresService {
  private baseURL = 'http://localhost:3001/v1/genres';
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
    const res = await this.instance.get<GenreResponse>(`/${id}`);

    return res.data;
  }

  async getAll(params: ParamsType<Genre>) {
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
