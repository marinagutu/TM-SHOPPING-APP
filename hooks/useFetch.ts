import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

type Request = {
  endpoint: string;
  query?: Object;
};

const useFetch = <T>(request: Request) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const options = {
    method: "GET",
    url: `https://dummyjson.com/${request.endpoint}`,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error as AxiosError);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
