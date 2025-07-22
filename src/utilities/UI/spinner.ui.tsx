import { useEffect, useState } from "react";
import { BackgroundBlurComponent } from './background.ui';

export function SpinnerComponent (){
    const [visible, setVisible] = useState(true);


    if (!visible) return null;

    return (
        <div className="h-screen w-full fixed z-10 flex flex-col justify-center items-center"> 
            <div className="w-full flex h-full flex-col justify-center items-center z-10"> 
                x
            </div>
            <BackgroundBlurComponent
                isBackground={true}
                isVisible={true}
            />
        </div>
    )
}