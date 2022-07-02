import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { ParamsType } from 'src/shared/pagination/pagination.types';
import { buildQueryParams } from 'src/shared/buildQueryParams';
import { UpdateTrackInput } from './dto/update-track.input';
import { CreateTrackInput } from './dto/create-track.input';
import { TracksPagination } from './track.model';
import { TrackResponse } from './track.interfaces';
import { FilterTracksInput } from './dto/filter-tracks.input';

@Injectable()
export class TracksService {
  private baseURL = 'http://localhost:3006/v1/tracks';
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
    const res = await this.instance.get<TrackResponse>(`/${id}`);

    return res.data;
  }

  async getAll(params: ParamsType<FilterTracksInput>) {
    const search = buildQueryParams(params);
    const res = await this.instance.get<TracksPagination>(`/?${search}`);

    return res.data;
  }

  async create(data: CreateTrackInput) {
    const { genres, bands, artists, ...rest } = data;
    const res = await this.instance.post<TrackResponse>(`/`, {
      ...rest,
      bandsIds: bands,
      artistsIds: artists,
      genresIds: genres,
    });

    return res.data;
  }

  async update(id: string, data: UpdateTrackInput) {
    const { genres, bands, artists, ...rest } = data;
    const res = await this.instance.put<TrackResponse>(`/${id}`, {
      ...rest,
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
