import { useContext } from "react";
import { GlobalUseContext } from "../context/context";
import { SpinnerComponent } from "../utilities/UI/spinner.ui";
import { layoutAttributes } from "../utilities/typedec";
import { ToastComponent } from "../Toast/toast";

export function PublicLayout({ children }: layoutAttributes) {
  const { state, dispatch } = useContext(GlobalUseContext);

  return (
    <div className="w-full h-screen flex flex-col">
      {state?.isLoading && <SpinnerComponent />}
{state?.isToastState?.notificationState && state?.isToastState?.notificationText && (
  <ToastComponent />
)}
      {children}
    </div>
  );
}
