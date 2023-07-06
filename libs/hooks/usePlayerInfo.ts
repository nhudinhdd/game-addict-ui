import { axiosClient } from "api-client/axios-client";
import { PlayerInfoRes } from "models/apiWapper/playerInfo";
import useSWR from "swr";

function usePlayerInfo() {
  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const { data, isLoading, error } = useSWR<[PlayerInfoRes]>(
    "/player-info?page=-1",
    fetcher
  );
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
export default usePlayerInfo;
