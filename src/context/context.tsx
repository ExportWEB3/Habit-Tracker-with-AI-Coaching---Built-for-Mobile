import { createContext, useReducer } from "react";
import type { globalUseContextStateAttributes, initialStateAttributes, layoutAttributes } from "../utilities/typedec";
import Reducer from "./reducer";


const intialState: initialStateAttributes = {
  user: null,
  accessToken: "",
  isLoading : false,
  isToastState: { notificationState: false, notificationText: '', icon: '', iconClassName: '', backgroundColor: '' }, // Ensure all toast fields are present
};

export const GlobalUseContext = createContext<globalUseContextStateAttributes>({
  state: intialState,
  dispatch: () => {},
});

export const GlobalUseContextProvider = ({ children }: layoutAttributes) => {
  const [state, dispatch] = useReducer(Reducer, { ...intialState });

  return (
    <GlobalUseContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalUseContext.Provider>
  );
};
