import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';
import { UserResponse } from './user.interfaces';

@Injectable()
export class UsersService {
  private baseURL;
  private instance: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.baseURL = this.configService.get('USERS_API');
    this.instance = axios.create({ baseURL: this.baseURL });
  }

  async jwt(email: string, password: string) {
    const res = await this.instance.post<{ jwt: string }>(`/login`, {
      email,
      password,
    });

    return res.data.jwt || null;
  }

  async getById(id: string) {
    const res = await this.instance.get<UserResponse>(`/${id}`);

    return res.data || null;
  }

  async register(user: CreateUserInput) {
    const res = await this.instance.post<UserResponse>(`/register`, user);

    return res.data;
  }
}
