import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <PropagateLoader color="#f5385D" speedMultiplier={0.5} />
    </div>
  );
};

export default Loader;
