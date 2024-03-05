import React from "react";
import { countPeriod, formattedDate } from "../helpers";
import { BookingDatesProps } from "../types";
import { SVG_ICONS } from "../data";

const BookingDates: React.FC<BookingDatesProps> = ({
  checkIn,
  checkOut,
  variant,
}) => {
  const totalNight = countPeriod(checkIn, checkOut);
  return (
    <div className={`flex  items-baseline gap-2 sm:items-center ${variant} `}>
      {totalNight && (
        <div className="flex flex-col items-center sm:flex-row">
          {SVG_ICONS.moon}
          <span>{totalNight} night: </span>
        </div>
      )}
      <div className="flex flex-col items-center sm:flex-row sm:items-start">
        {SVG_ICONS.calendar}
        {formattedDate(new Date(checkIn))}
      </div>
      &rarr;
      <div className="flex flex-col items-center sm:flex-row sm:items-start">
        {SVG_ICONS.calendar}
        {formattedDate(new Date(checkOut))}
      </div>
    </div>
  );
};

export default BookingDates;
