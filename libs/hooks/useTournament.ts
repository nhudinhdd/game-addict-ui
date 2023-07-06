import { axiosClient } from "api-client/axios-client";
import { TournamentRes } from "models/apiWapper/tournament";
import useSWR from "swr";

function useTournament() {
  const fetcher = async (url: string, contientName: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };

  const { data, isLoading, error } = useSWR<[TournamentRes]>(`/tour`, fetcher);
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
export default useTournament;
