import { axiosClient } from "api-client/axios-client";
import { SeasonRes } from "models/apiWapper/season";
import useSWR from "swr";

function useSeason() {
  const fetcher = async (url: string, contientName: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };

  const { data, isLoading, error } = useSWR<[SeasonRes]>(`/season`, fetcher);
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
export default useSeason;
