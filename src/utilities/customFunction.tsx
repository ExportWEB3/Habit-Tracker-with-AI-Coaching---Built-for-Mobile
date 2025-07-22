import { AxiosError } from "axios";
import { axiosPrivate } from "../hooks/BASEURL";
import type { clientResponseAttributes } from "./typedec";

export const RefreshFunction = () => {
  const refreshToken = async () => {
    //dispatch({type: actionEnum.CLEAR_IN_MEMORY_VARIABLE, payload: null})

    try {
      const res = await axiosPrivate.post<clientResponseAttributes>(
        `/refresh`,
        {},
        { withCredentials: true }
      );

      const accessToken = res?.data?.payload;

      return accessToken;
    } catch (error) {
      return "Invalid session";
    }
  };

  return refreshToken;
};
