import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getData } from "../fetching";
import { BookingType } from "../types";
import PlaceImage from "../components/PlaceImage";
import BookingDates from "../components/BookingDates";
import { ROUTES } from "../routing/routes";

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[] | []>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: BookingType[] = await getData("/bookings");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching place data:", error);
      toast.error("Error fetching place data");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <Link
            to={ROUTES.booking(booking._id)}
            key={booking._id}
            className="flex gap-4 overflow-hidden rounded-2xl bg-gray-200/60"
          >
            <div className="flex h-28 w-36">
              {booking?.place?.photos?.[0] && (
                <PlaceImage fileName={booking.place.photos[0]} />
              )}
            </div>
            <div className="flex flex-col justify-around p-2">
              <h2 className=" text-xl ">{booking.place.title}</h2>
              <BookingDates
                checkIn={booking.checkIn}
                checkOut={booking.checkOut}
                variant="text-gray-500"
              />
              <div className="text-xl">
                Total price:
                <span className="pl-2 font-semibold">{booking.price}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BookingsPage;
