import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryKey, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';

interface FetcherOptions extends AxiosRequestConfig {}

export const fetcher = async (
  url: string,
  method: 'GET' | 'POST' = 'GET',
  data: any = null,
  options: FetcherOptions = {},
  timeout = 5000
): Promise<any> => {
  const source = axios.CancelToken.source();
  const fetchOptions: AxiosRequestConfig = { ...options, cancelToken: source.token, method };

  if (method === 'POST' && data) {
    fetchOptions.data = data;
  }

  try {
    console.log('--url--',url);
    const response: AxiosResponse = await axios({
      url,
      method,
      ...fetchOptions
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}, details: ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error('Request timed out');
    }

    throw new Error(`Fetch error: ${error.message}`);
  }
};

type UseCustomQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
  initialData?: () => undefined;
};

export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseCustomQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(options);
};

export const useCustomMutation = <TData, TError, TVariables, TContext>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  return useMutation<TData, TError, TVariables, TContext>(options);
};
