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

  const options = {
    method: "GET",
    url: `https://dummyjson.com/${request.endpoint}`,
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.log("api error:", error);
      setError(error as AxiosError);
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
