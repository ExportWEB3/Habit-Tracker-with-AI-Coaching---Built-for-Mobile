import { actionAttributes, initialStateAttributes, isNotificationPopAttributes, userAttributes } from "../utilities/typedec";

  
  const Reducer = (state: initialStateAttributes, action: actionAttributes) => {
    switch (action.type) {
      case "STORE_USER":
        return {
          ...state,
          user: action.payload as userAttributes,
        };
  
    case "SET_TOAST":
      return {
        ...state,
        isToastState: action.payload as isNotificationPopAttributes,
      };

    case "CLEAR_TOAST":
      return {
        ...state,
        isToastState: action.payload as isNotificationPopAttributes,
      };
  
      case "CLEAR_USER":
        return {
          ...state,
          user: null,
        };

      case "ISLOADING_START":
        return {
          ...state,
          isLoading: true,
        };

      case "ISLOADING_END":
        return {
          ...state,
          isLoading: false,
        }
      
  

      default:
        return state;
    }
  };
  
  export default Reducer;
  