import type { iconAttributes } from "../utilities/typedec";

export function Icon (props: iconAttributes) {
  const { icon, className, onClick } = props; // Added onClick prop
  return <i className={`${icon} ${className}`} onClick={onClick}></i>; // Attached onClick to the <i> element
}
