import { axiosPrivate } from "./BASEURL";
import { useEffect, useContext } from "react";
import { GlobalUseContext } from "../context/context";
import { RefreshFunction } from "../utilities/customFunction";

const useAxiosPrivate = () => {
  const refreshToken = RefreshFunction();
  const { state } = useContext(GlobalUseContext);

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["authorization"]) {
          //const turf = await refreshToken();
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const getTurf = (await refreshToken()) as
            | string
            | { message: string; statusCode: number };

          const access = getTurf as { message: string; statusCode: number };

          if (access?.statusCode === 501) {
            //dispatch({type: actionEnum.CLEAR_USER_REFRESH});

            return;
            //dispatch({type: actionEnum.SET_IN_MEMORY_VARIABLE, payload: getTurf});
          }

          prevRequest.headers["authorization"] = `Bearer ${getTurf}`;

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [state.accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
