import React from 'react';
import './button.css'
import { CustomButtonAttributes } from '../../utilities/typedec';


export function Button (props: CustomButtonAttributes) {
    const {
        btnText,
        className,
        onClick,
        type,
        disabled,
    } = props;


    const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (onClick) {
          onClick(event);
        }
      };


  return (
    <button
        type={type}
        className={`px-4 py-2 rounded ${disabled ? 'button-disabled' : ''} ${className}`}
        onClick={handleClick}
        disabled={disabled}
        >
        {btnText}
        </button>
  );
};

