import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';

import { FavouritesResponse } from './favourite.interfaces';
import { FavouriteType } from './dto/favourite.types';

@Injectable()
export class FavouritesService {
  private baseURL;
  private instance: AxiosInstance;

  constructor(
    @Inject(CONTEXT) { req: request }: { req: IncomingMessage },
    private configService: ConfigService,
  ) {
    this.baseURL = this.configService.get('FAVOURITES_API');
    this.instance = axios.create({ baseURL: this.baseURL });
    this.instance.interceptors.request.use((req) => {
      const receivedAuth = request.headers?.authorization;

      if (!req.headers.authorization && receivedAuth) {
        req.headers.authorization = receivedAuth;
      }

      return req;
    });
  }

  async favourites() {
    const res = await this.instance.get<FavouritesResponse>(`/`);
  }

  async add(type: FavouriteType, id: string) {
    const res = await this.instance.put<FavouritesResponse>(`/add`, {
      id,
      type,
    });

    return res.data;
  }

  async remove(type: FavouriteType, id: string) {
    const res = await this.instance.put<FavouritesResponse>(`/remove`, {
      id,
      type,
    });

    return res.data;
  }
}
