import { ParamsType } from './pagination/pagination.types';

export const buildQueryParams = <T>(params: ParamsType<T>) => {
  const url = new URLSearchParams();

  for (const value of Object.values(params)) {
    for (const param of Object.entries(value || [])) {
      url.append(param[0], param[1]);
    }
  }

  return url.toString();
};
