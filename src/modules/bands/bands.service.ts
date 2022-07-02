import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { UpdateBandInput } from './dto/update-band.input';
import { CreateBandInput } from './dto/create-band.input';
import { Band, BandsPagination } from './band.model';
import { BandResponse } from './band.interfaces';

@Injectable()
export class BandsService {
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
    const res = await this.instance.get<BandResponse>(`/${id}`);

    return res.data;
  }

  async getAll(params: ParamsType<Band>) {
    const search = buildQueryParams(params);
    const res = await this.instance.get<BandsPagination>(`/?${search}`);

    return res.data;
  }

  async create(data: CreateBandInput) {
    const { genres, ...rest } = data;
    const res = await this.instance.post<BandResponse>(`/`, {
      ...rest,
      genresIds: genres,
    });

    return res.data;
  }

  async update(id: string, data: UpdateBandInput) {
    const res = await this.instance.put<BandResponse>(`/${id}`, data);

    return res.data;
  }

  async delete(id: string) {
    const res = await this.instance.delete(`/${id}`);

    return res.data;
  }
}
