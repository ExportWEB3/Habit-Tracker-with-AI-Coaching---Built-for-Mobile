import { useContext, useEffect, useState } from "react";
import "./toast.css";
import { GlobalUseContext } from "../context/context";
import { Icon } from "../Icon.component/Icon";

export function ToastComponent() {
  const { state, dispatch } = useContext(GlobalUseContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state?.isToastState?.notificationState) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false); 
        setTimeout(() => {
          dispatch({ type: "CLEAR_TOAST", payload: { notificationState: false, notificationText: "", icon: "", iconClassName: "", backgroundColor: "" } });
        }, 500); // Delay dispatch to allow transition
      }, 3000);
    }
  }, [state?.isToastState]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch({ type: "CLEAR_TOAST", payload: { notificationState: false, notificationText: "", icon: "", iconClassName: "", backgroundColor: "" } });
    }, 200); // Delay dispatch to allow transition
  };

  

  return (
    <div
      className={`pop zIndex10 flex justify-center h-screen fixed transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="popUpDiv mt-20 flex items-center relative h-full overflow-hidden w-full max-w-md mx-auto"
      >
        <div
          className="w-16 h-16 flex items-center justify-center mobileG"
          style={{ backgroundColor: state?.isToastState?.backgroundColor || "green" }}
        >
          <Icon
            icon={state?.isToastState?.icon || "ri-information-fill"}
            className={`toastIcon text-2xl ml-4 ${state?.isToastState?.iconClassName || ""}`}
          />
        </div>
        <p className="popUpText font-root font-medium font-gray-800 ml-3">
          {state?.isToastState?.notificationText ? state?.isToastState?.notificationText : "Item added"}
        </p>
        <Icon
          icon="ri-close-fill"
          className="cursor-pointer text-2xl absolute right-4"
          onClick={handleClose}
        />
      </div>
    </div>
  );
}
