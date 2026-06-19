import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type Request = {
  endpoint: string;
  query?: Object;
};

const useFetch = <T>(request: Request) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const url = `https://dummyjson.com/${request.endpoint}`;

  const fetchData = async (requestUrl = url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.request({
        method: "GET",
        url: requestUrl,
      });
      setData(response.data);
    } catch (error) {
      console.log("api error:", error);
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData(undefined);
    fetchData(url);
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
