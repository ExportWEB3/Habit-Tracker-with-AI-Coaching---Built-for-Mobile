import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { TypedTextProps } from "../../utilities/typedec";
import "./animatedText.css"



export function TypedText({ strings, className = "" }: TypedTextProps) {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed: 30,
        backSpeed: 35,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, [strings]);

  return (
      <div className={` flex items-center space-x-4 ${className} animateDashTxt`}>
        <div className="w-8 h-[5px] bg-blue-500 mt-5 rounded-md animateDashRes" />
        <p className=" font-bold text-center relative ">
<span
  ref={el}
  className=" bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent "
/>
        </p>
        <div className="w-8 h-[5px] bg-black mt-5 rounded-md animateDashRes" />
      </div>
  );
}
