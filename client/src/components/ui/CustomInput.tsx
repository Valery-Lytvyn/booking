import React, { memo } from "react";
import { CustomInputProps } from "../../types";

const CustomInput: React.FC<CustomInputProps> = memo(
  ({ id, type, placeholder, value, handleInputChange }) => {
    return (
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => handleInputChange(e)}
        className="my-2 w-full rounded-2xl border px-3 py-2 outline-none"
      />
    );
  },
);

export default CustomInput;
