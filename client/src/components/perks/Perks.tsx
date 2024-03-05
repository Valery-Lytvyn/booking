import React from "react";
import { perks } from "../../data";
import PerkItem from "./PerkItem";
import { PerksProps } from "../../types";

const Perks: React.FC<PerksProps> = ({ handlerChangePerks, checkedPerks }) => {
  return (
    <>
      {perks.map(({ id, perk, name, icon }) => {
        const isChecked = checkedPerks.includes(perk);
        return (
          <PerkItem
            key={id}
            id={id}
            perk={perk}
            name={name}
            icon={icon}
            isChecked={isChecked}
            handlerChangePerks={handlerChangePerks}
          />
        );
      })}
    </>
  );
};

export default Perks;
