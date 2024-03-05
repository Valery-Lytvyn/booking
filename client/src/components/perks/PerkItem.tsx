import React, { memo } from "react";
import { PerkItemProps } from "../../types";

const PerkItem: React.FC<PerkItemProps> = memo(
  ({ id, name, icon, perk, handlerChangePerks, isChecked }) => {
    return (
      <label
        className="flex cursor-pointer items-center gap-2 rounded-2xl border p-1 sm:p-4"
        key={id}
        htmlFor={name}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          onChange={() => handlerChangePerks(perk)}
          checked={isChecked}
        />
        {icon}
        <span>{perk}</span>
      </label>
    );
  },
);

export default PerkItem;
