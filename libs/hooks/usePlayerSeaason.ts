import { axiosClient } from "api-client/axios-client";
import { PlayerSeasonDetailRes } from "models/apiWapper/player";
import useSWR from "swr";

interface PlayerSesonProps {
  playerSeasonID?: string;
}
function usePlayerSeason(props: PlayerSesonProps) {
  const { playerSeasonID } = props;
  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const { data, isLoading, error } = useSWR<PlayerSeasonDetailRes>(
    playerSeasonID ? `/player-season/${playerSeasonID}` : null,
    fetcher
  );
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
export default usePlayerSeason;
