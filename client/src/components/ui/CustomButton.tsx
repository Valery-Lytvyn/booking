import React from "react";
import { CustomButtonProps } from "../../types";

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonName,
  variant,
  type,
  clickHandler,
}) => {
  return (
    <button
      type={type}
      className={`my-2 w-full rounded-2xl p-2 capitalize text-white transition hover:shadow-md hover:shadow-gray-800/40 active:scale-95  ${variant}`}
      aria-label={`${buttonName} button`}
      onClick={clickHandler}
    >
      {buttonName}
    </button>
  );
};

export default CustomButton;
