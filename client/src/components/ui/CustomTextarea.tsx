import React, { memo } from "react";
import { CustomTextareaProps } from "../../types";

const CustomTextarea: React.FC<CustomTextareaProps> = memo(
  ({ id, placeholder, value, handleTextareaChange }) => {
    return (
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleTextareaChange(e)}
        className="my-2 w-full rounded-2xl border px-3 py-2 outline-none"
      />
    );
  },
);

export default CustomTextarea;
