import { useContext, useEffect, useState } from "react";
import type { layoutAttributes } from "../utilities/typedec";
import { GlobalUseContext } from "../context/context";
import { ToastComponent } from "../Toast/toast";
import { SpinnerComponent } from "../utilities/UI/spinner.ui";


export function LayoutComponent({ children }: layoutAttributes) {
  const { state, dispatch } = useContext(GlobalUseContext);
  const [isOnline, setIsOnline] = useState<boolean>(false);

useEffect(() => {
  const findUser = localStorage.getItem("onlineId");
  setIsOnline(!!findUser);
}, [state?.user]); 



  return (
    <div className="width100 height100 flex flex-column">
            {state?.isLoading && <SpinnerComponent/>}
      {state?.isToastState?.notificationText && <ToastComponent />}
      {/*children */}
    </div>
  );
}
