import { useContext, useEffect, useState } from "react";
import "./toast.css";
import { Icon } from "../Icon.component/Icon";
import { GlobalUseContext } from "../context/context";

export function ToastComponent() {
  const { state, dispatch } = useContext(GlobalUseContext);
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const toast = state?.isToastState;

  if (toast?.notificationState === true) {
    setIsVisible(true);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      const clearTimer = setTimeout(() => {
        dispatch({
          type: "CLEAR_TOAST",
          payload: {
            notificationState: false,
            notificationText: "",
            icon: "",
            iconClassName: "",
            backgroundColor: "",
            timer: 3000,
          },
        });
      }, 500);

      return () => clearTimeout(clearTimer);
}, Number(state?.isToastState?.timer) || 3000);

    return () => clearTimeout(hideTimer);
  }
}, [state?.isToastState?.notificationState]);

const handleClose = () => {
  setIsVisible(false);
  dispatch({
    type: "CLEAR_TOAST",
    payload: {
      notificationState: false,
      notificationText: "",
      icon: "",
      iconClassName: "",
      backgroundColor: "",
      timer: 3000,
    },
  });
};

console.log("Toast visibility check", {
  notificationState: state?.isToastState?.notificationState,
  isVisible,
});

const toast = state?.isToastState;
if (!toast?.notificationState && !isVisible) return null;



  return (
    <div
      className={`pop zIndex10 flex justify-center h-full fixed transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="popUpDiv mt-20 flex items-center relative h-full overflow-hidden w-full max-w-md mx-auto">
        <div
          className="w-16 h-16 flex items-center justify-center mobileG"
          style={{
            backgroundColor: state?.isToastState?.backgroundColor || "green",
          }}
        >
          <Icon
            icon={state?.isToastState?.icon || "ri-information-fill"}
            className={`toastIcon text-2xl ml-4 ${state?.isToastState?.iconClassName || ""}`}
          />
        </div>
        <p className="popUpText font-root font-medium font-gray-800 ml-3">
          {state?.isToastState?.notificationText || "Item added"}
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
