import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { FilterBandsInput } from './dto/filter-bands.input';
import { UpdateBandInput } from './dto/update-band.input';
import { CreateBandInput } from './dto/create-band.input';
import { BandResponse } from './band.interfaces';
import { BandsPagination } from './band.model';

@Injectable()
export class BandsService {
  private baseURL;
  private instance: AxiosInstance;

  constructor(
    @Inject(CONTEXT) { req: request }: { req: IncomingMessage },
    private configService: ConfigService,
  ) {
    this.baseURL = this.configService.get('BANDS_API');
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

    return res.data || null;
  }

  async getAll(params: ParamsType<FilterBandsInput>) {
    const genres = params.filter?.genres
      ? { genresIds: params.filter?.genres }
      : {};
    delete params.filter?.genres;

    const search = buildQueryParams({
      ...params,
      filter: { ...params.filter, ...genres },
    });
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
    const { genres, ...rest } = data;
    const res = await this.instance.put<BandResponse>(`/${id}`, {
      ...rest,
      genresIds: genres,
    });

    return res.data;
  }

  async delete(id: string) {
    const res = await this.instance.delete(`/${id}`);

    return res.data;
  }
}
