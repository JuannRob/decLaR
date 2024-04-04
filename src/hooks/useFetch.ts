import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Data } from "../ts/api.interface";
import { ApiRequest, Options } from "../ts/Search.interface";
import { config } from "../config/config";

interface FetchResult {
  data: Data | null;
  isLoading: boolean;
  error: AxiosError | null;
}

export function useFetch(query: ApiRequest, deps: [Options]): FetchResult {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const params: URLSearchParams = new URLSearchParams(query);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await axios.get(
          `${config.api.url}/decrees`,
          {
            params,
          },
        );
        setData(response.data.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, isLoading, error };
}
