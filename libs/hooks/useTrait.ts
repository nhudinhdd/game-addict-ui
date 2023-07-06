import { axiosClient } from "api-client/axios-client";
import { TraitResponse } from "models/apiWapper/trait";
import useSWR from "swr";

function useTrait() {
  const fetcher = async (url: string, contientName: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };

  const { data, isLoading, error } = useSWR<[TraitResponse]>(`/trait`, fetcher);
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
export default useTrait;
