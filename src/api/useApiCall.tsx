import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import api from './api.config.ts';

type ApiQueryParams = Record<string, any>;

export function useApiQuery<TResponse, TParams extends ApiQueryParams = ApiQueryParams>(
  key: string | any[],
  path: string,
  params?: TParams,
  options?: UseQueryOptions<TResponse, unknown, TResponse, any[]>
) {
  return useQuery<TResponse, unknown, TResponse, any[]>({
    queryKey: Array.isArray(key) ? key : [key, params],
    queryFn: async () => {
      const { data } = await api.get<TResponse>(path, { params });
      return data;
    },
    ...options
  });
}

export function useApiMutation<TResponse, TParams = any>(
  path: string,
  method: 'post' | 'put' | 'delete' = 'post',
  options?: UseMutationOptions<TResponse, unknown, TParams, unknown>
) {
  return useMutation<TResponse, unknown, TParams, unknown>({
    mutationFn: async (params: TParams) => {
      const { data } = await api[method]<TResponse>(path, params);
      return data;
    },
    ...options
  });
}
