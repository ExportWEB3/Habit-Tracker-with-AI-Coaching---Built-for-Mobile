import type { ReactNode } from "react";

export interface layoutAttributes {
  children: ReactNode;
}

export interface initialStateAttributes {
  user: userAttributes | null;
  accessToken: string;
  isToastState: isNotificationPopAttributes;
  isLoading: boolean
}

export interface productsAttrubutes {
  productName: string;
  description: string;
  price: string;
  availability: string;
  img: string;
  quantity: string;
  id: number;
}

export interface userAttributes {
  userName: string;
  password: string;
  email: string;
}

export type userRolesAttributes = "admin_user" | "customer_user";

export type actionAttributes =
  | {
      type: "STORE_USER";
      payload: userAttributes;
    }
  | {
      type: "SET_TOAST";
      payload?: isNotificationPopAttributes;
    }
  | {
      type: "CLEAR_TOAST";
      payload: isNotificationPopAttributes;
    }
  | {
      type: "CLEAR_USER";
    }
  | {
      type: "ISLOADING_START";
    }
  | {
      type: "ISLOADING_END";
    }


    export interface globalErrorAttributes {
  isError: boolean;
  message: string;
}

export interface toastAttributes {
  text?: string;
  state: boolean;
  iconClassName?: string;
  backgroundColor?: string;
}

export interface errorResponse{
    status: errorStatusCodes;
    message: string;
    payload?: unknown;
}

export interface clientResponseAttributes {
  text?: string;
  payload?: unknown;
  status?: errorStatusCodes;
}

export type OtpInputRefs = Array<HTMLInputElement | null>;

export type OtpKeyDownHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  idx: number
) => void;

export interface globalHTTPReqFuncAttributes {
  apiEndPoint: string;
  httpMethod: "post" | "get" | "patch" | "delete";
  reqData?: unknown;
  isSuccessNotification: isNotificationPopAttributes;
  timerDuration?: number;
  responseType?: httpResponseTypeAttrbutes;
  contypeType?: "multipart/form-data" | "application/json";
}

export interface isNotificationPopAttributes {
  isTimer?: boolean;
  timer?: number | string;
  notificationState?: boolean;
  notificationText: string;
  bgColour?: string;
  textColour?: string;
  isNavigation?: boolean;
  isURL?: boolean;
  URL?: string;
  isRevalidate?: boolean;
  isRevaliddateURL?: string;
  showCancelButton?: boolean;
  statusCode?: statusCodes;
  event?: notificationButtonEvents;
  iconClassName?: string; 
  backgroundColor?: string; 
  text?: string;
  icon?: string;

}

export type httpResponseTypeAttrbutes =
  | "arraybuffer"
  | "blob"
  | "document"
  | "formdata"
  | "stream"
  | "json"
  | "text";

export type notificationButtonEvents = "ok" | "cancel" | "";

export type statusCodes = 500 | 200 | 501 | 401 | 404 | number | null;


export interface globalUseContextStateAttributes {
  state: initialStateAttributes;
  dispatch: React.Dispatch<actionAttributes>;
}

export interface buttonAttributes {
  btnName: string;
  onClick?: Function;
}

export type TypedTextProps = {
  strings: string[];
  className?: string;
};

export type TiltImageProps = {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
};

export interface loginAttributes {
  email: string;
  password: string;
}



export interface inputAttributes {
  placeHolder?: string;
  type: "text" | "password" | "radio";
  displayText?: string;
  className?: string;
  displayType?: "flex-row" | "flex-col";
  onChange?: Function;
  payload?: unknown;
  divClassName?: string;
  value?: unknown;
  displayTextClassName?: string; // NEW: allow custom class for display text
}

export type registerationDataAttributes = {
  field: registeruserAttributes
  name: registerationNameAttributes
}

export type registerationNameAttributes =  "email" | "password" | "userName";


export type registeruserAttributes =
  | "Password"
  | "Email"
  | "Username";

export interface CustomButtonAttributes {
  btnText: string;
  onClick?: Function;
  className?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  link?: string;
  children: React.ReactNode;
}

export interface loginAttributes {
  email: string;
  password: string;
}


export interface iconAttributes {
  icon: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>; // Updated onClick type for compatibility
}

export interface clientResponseAttributes {
  text?: string;
  payload?: unknown;
  status?: errorStatusCodes;
}
export type BackendErrorResponse = {
  message?: string;
  status?: number;
};

export interface errorResponse {
  error: boolean;
  status: number;
  message: string;
  payload?: unknown;
}

// ✅ Backend expected success response
export interface SuccessResponse {
  status?: number;
  text: string;
  payload?: any;
}

// ✅ Backend expected error shape
export interface ErrorResponse {
  error: true;
  message: string;
  status?: number;
}


// Union type
export type RegisterResponse = SuccessResponse | errorResponse;


export type errorStatusCodes = 500 | 501 | 401 | 402 | 404 | 200 | number;

export type LoginResponse = {
  status: number;
  text: string;
  payload: {
    _id: string;
    responseData: unknown;
  };
};

export interface divAttributes {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
}
export type divProps = divAttributes & {
  animateOnView?: boolean;
};