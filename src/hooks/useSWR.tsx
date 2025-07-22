import useSWR from "swr";

export const useFetcher = (cacheKey: string | null, request: any) => {
  const {
    data: fetchData,
    error: fetchError,
    isLoading: fetchIsLoading,
    mutate,
  } = useSWR(cacheKey, request, { revalidateOnFocus: false });

  return {
    fetchData,
    fetchError,
    fetchIsLoading,
    mutate,
  };
};
