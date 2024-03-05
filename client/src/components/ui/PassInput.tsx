import React, { memo, useState } from "react";
import { CustomInputProps } from "../../types";
import { SVG_ICONS } from "../../data";

const PassInput: React.FC<CustomInputProps> = memo(
  ({ id, placeholder, value, handleInputChange }) => {
    const [showPass, setShowPass] = useState(false);

    const showPassToggle = () => {
      setShowPass((prev) => !prev);
    };
    return (
      <div className="relative mx-auto w-full ">
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          type={showPass ? "text" : "password"}
          onChange={handleInputChange}
          className="my-2 w-full rounded-2xl border px-3 py-2 outline-none"
        />
        <button
          type="button"
          onClick={showPassToggle}
          aria-label="Show password button"
          className="absolute inset-y-0 right-0  flex items-center p-2 text-gray-500"
        >
          {showPass ? SVG_ICONS.eye : SVG_ICONS["eye-slash"]}
        </button>
      </div>
    );
  },
);

export default PassInput;
