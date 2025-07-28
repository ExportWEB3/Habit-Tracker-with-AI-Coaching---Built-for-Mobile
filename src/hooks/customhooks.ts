import { useContext } from "react";
import { GlobalUseContext } from "../context/context";
import useAxiosPrivate from "./useAxiosHook";
import { AxiosError } from "axios";
import useSWR from "swr";
import type { errorResponse, globalHTTPReqFuncAttributes, isNotificationPopAttributes } from "../utilities/typedec";

export const useHttpFetcher = () => {
  const { state, dispatch } = useContext(GlobalUseContext);
  const { notify } = useNotificationHook();
  const axiosPrivate = useAxiosPrivate();

const fetchIt = async (params: globalHTTPReqFuncAttributes): Promise<errorResponse> => {
  const {
    apiEndPoint,
    httpMethod,
    reqData,
    isSuccessNotification,
    timerDuration,
    contypeType,
    responseType,
  } = params;

  dispatch({ type: 'ISLOADING_START' });

  try {
    const res = await axiosPrivate({
      method: httpMethod,
      url: `/${apiEndPoint}`,
      data: reqData,
      withCredentials: true,
      responseType: responseType,
      headers: {
        "Content-Type": contypeType ?? "application/json",
        authorization: `Bearer ${state?.accessToken}`,
      },
    });

    // ✅ Show success toast if enabled
    if (isSuccessNotification?.notificationState && httpMethod !== "get") {
      notify({
        notificationText: isSuccessNotification?.notificationText || "Success",
        isURL: isSuccessNotification?.isURL || false,
        URL: isSuccessNotification?.URL || "",
        isTimer: isSuccessNotification?.isTimer ?? true,
        timer: timerDuration ?? "3000",
        bgColour: isSuccessNotification?.bgColour,
        isNavigation: isSuccessNotification?.isNavigation ?? true,
        isRevalidate: isSuccessNotification?.isRevalidate,
        isRevaliddateURL: isSuccessNotification?.isRevaliddateURL,
      });
    }

    dispatch({ type: "ISLOADING_END" });
    return res.data as errorResponse;

  } catch (error: any) {
    dispatch({ type: "ISLOADING_END" });

    // ✅ Just rethrow — toast will be handled by the caller
    throw error;
  }
};

return {fetchIt}
};

export const useSWRHook = (props: {
  cacheKey: string | null;
  apiEndPoint?: string;
  reqFucn?: any;
  httpMethod?: "get" | "post" | "patch" | "delete";
  isConditional?: boolean;
  conditionalStatement?: boolean;
  payload?: any;
}) => {
  const {
    cacheKey,
    apiEndPoint,
    reqFucn,
    isConditional,
    conditionalStatement,
    httpMethod,
    payload,
  } = props;

  const { fetchIt } = useHttpFetcher();

  const getData = async () => {
    try {
      const response = await fetchIt({
        apiEndPoint: `${apiEndPoint}`,
        httpMethod: httpMethod ? httpMethod : "get",
        reqData: payload,
        isSuccessNotification: {
          notificationState: false,
          notificationText: "",
        },
      });

      return response;
    } catch (error) {
      return;
    }
  };

  const {
    data: fetchData,
    error: fetchError,
    isLoading: fetchIsLoading,
    mutate,
  } = useSWR(
    isConditional ? (conditionalStatement ? cacheKey : null) : cacheKey,
    getData,
    { revalidateOnFocus: false }
  );

  return {
    fetchData,
    fetchError,
    fetchIsLoading,
    mutate,
  };
};

// an example of reaact hook that can be used to show notifications and should start with use function hook
export const useNotificationHook = () => {
  const { dispatch } = useContext(GlobalUseContext);
  const notify = (params: isNotificationPopAttributes) => {
    const {
      isTimer,
      timer,
      notificationState,
      notificationText,
      bgColour,
      textColour,
      isNavigation,
      isURL,
      URL,
      isRevalidate,
      isRevaliddateURL,
      showCancelButton,
      statusCode,
      event,
    } = params;

    dispatch({
      type: "SET_TOAST",
      payload: {
        notificationText,
        URL,
        isTimer,
        timer,
        isNavigation,
        notificationState,
        bgColour,
        textColour,
        isURL,
        isRevalidate,
        isRevaliddateURL,
        showCancelButton,
        statusCode,
        event,
      },
    });
  };

  return {
    notify,
  };
};
