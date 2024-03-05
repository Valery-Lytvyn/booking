import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { add } from "date-fns";
import CustomButton from "./ui/CustomButton";
import CustomInput from "./ui/CustomInput";
import { countPeriod, formatMoney, formattedDate } from "../helpers";
import { BookingWidgetProps } from "../types";
import { ROUTES } from "../routing/routes";
import { UserContext } from "../providers/ContextProvider";

const today = new Date();
const tomorrow = add(new Date(), {
  days: 1,
});

const defaultBookingData = {
  checkIn: formattedDate(today),
  checkOut: formattedDate(tomorrow),
  numberOfGuests: 1,
  fullName: "",
};

const BookingWidget: React.FC<BookingWidgetProps> = ({ price, id }) => {
  const [bookingData, setBookingData] = useState(defaultBookingData);
  const [bookingDays, setBookingDays] = useState(1);
  const [isRedirect, setIsRedirect] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({ ...prev, fullName: user.name }));
    }
  }, [user]);

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const numberOfDays = countPeriod(
        bookingData.checkIn,
        bookingData.checkOut,
      );
      setBookingDays(numberOfDays);
    }
  }, [bookingData.checkIn, bookingData.checkOut]);

  const handleGuestsChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData((prev) => ({
      ...prev,
      [e.target.id]: e.target.valueAsNumber,
    }));
  };

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalPrice = formatMoney(bookingDays * price);

  const bookingHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/bookings", {
        ...bookingData,
        price: totalPrice,
        place: id,
        _id: Date.now().toString(),
      });
      setIsRedirect(true);
    } catch (error) {
      console.log("Error creating bookings", error);
      toast.error("Error creating bookings");
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.bookings} />;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow ">
      <p className="pb-2 text-center text-2xl"> Price: {price} /per night</p>
      <form
        className="flex flex-col rounded-2xl border"
        onSubmit={bookingHandler}
      >
        <div className="flex">
          <div className="flex flex-1 flex-col gap-1 border-r p-2">
            <label htmlFor="checkIn" className="font-semibold uppercase">
              Check in
            </label>
            <CustomInput
              type="date"
              id="checkIn"
              placeholder=""
              value={bookingData.checkIn}
              handleInputChange={handleInputChanged}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1 p-2">
            <label htmlFor="checkOut" className="font-semibold uppercase">
              Check out
            </label>
            <CustomInput
              type="date"
              id="checkOut"
              placeholder=""
              value={bookingData.checkOut}
              handleInputChange={handleInputChanged}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 border-t p-2">
          <label htmlFor="numberOfGuests" className="font-semibold uppercase">
            Guests
          </label>
          <CustomInput
            type="number"
            id="numberOfGuests"
            placeholder="1"
            value={bookingData.numberOfGuests}
            handleInputChange={handleGuestsChanged}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 border-t p-2">
          <label htmlFor="fullName" className="font-semibold uppercase">
            Your full name
          </label>
          <CustomInput
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={bookingData.fullName}
            handleInputChange={handleInputChanged}
          />
        </div>
        <div className="p-2">
          <CustomButton
            type="submit"
            buttonName={`Book this place ${totalPrice}`}
            variant="bg-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingWidget;
