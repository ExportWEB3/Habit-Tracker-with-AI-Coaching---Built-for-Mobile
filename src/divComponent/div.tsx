// Div.tsx
import { useInViewFade } from "../custom hooks/useInViewFade";
import type { divAttributes } from "../utilities/typedec";

export function Div(props: divAttributes & { animateOnView?: boolean }) {
  const { animateOnView = false, children, className, id, onClick, style, onMouseEnter, onMouseLeave } = props;

  const { ref, isVisible } = useInViewFade();

  const classNames = [
    className,
    animateOnView ? "fade-in" : "",
    animateOnView && isVisible ? "visible" : "",
  ].join(" ");

  return (
    <div
      ref={animateOnView ? ref : null}
      className={classNames}
      id={id}
      onClick={onClick}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
