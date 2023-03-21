import { useState, useEffect } from 'react';
import { $api } from 'api';

export interface IRequestStatus {
  data: any;
  isLoading: boolean;
  error: any | null;
}

export interface IRequestReturnStatus<T, E = unknown> {
  data: T;
  isLoading: boolean;
  error: E;
}

export type Method = 'post' | 'get';

export const useRequest = <T, E = unknown>(
  url: string,
  method: Method,
  filds?: any
): IRequestReturnStatus<T, E> => {
  const [reqStatus, setReqStatus] = useState<IRequestStatus>({
    isLoading: false,
    error: null,
    data: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setReqStatus((p) => ({ ...p, isLoading: true }));
        const { data } = await $api[method]<T>(url, filds);

        setReqStatus((p) => ({ ...p, data }));
      } catch (error) {
        setReqStatus((p) => ({ ...p, error }));
      } finally {
        setReqStatus((p) => ({ ...p, isLoading: true }));
      }
    };

    loadData();
  }, []);

  return { ...reqStatus };
};
