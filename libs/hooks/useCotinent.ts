import { axiosClient } from "api-client/axios-client";
import { ContinentRes } from "models/continent/continent";
import useSWR from "swr";

function useContinent() {
  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const { data, isLoading, error } = useSWR<[ContinentRes]>(
    `/continent`,
    fetcher
  );
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
export default useContinent;
