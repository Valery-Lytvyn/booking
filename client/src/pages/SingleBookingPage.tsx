import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BookingType } from "../types";
import { getData } from "../fetching";
import Loader from "../components/loader/Loader";
import PlaceImageGallery from "../components/PlaceImageGallery";
import BookingDates from "../components/BookingDates";
import { SVG_ICONS } from "../data";

const SingleBookingPage: React.FC = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: BookingType[] = await getData("/bookings");
        const foundBooking = data.find(({ _id }) => _id === id);
        foundBooking
          ? setBooking(foundBooking)
          : toast.error("No bookings found");
      } catch (error) {
        console.error("Error fetching place data:", error);
        toast.error("Error fetching place data");
      }
    };
    fetchData();
  }, [id]);

  if (!booking) {
    return <Loader />;
  }
  const { place, checkIn, checkOut, price } = booking;

  return (
    <div className="py-8">
      {booking && Object.keys(booking).length > 0 && (
        <>
          <h1 className="text-3xl">{place.title}</h1>
          <div className="flex items-center gap-1 font-semibold underline">
            {SVG_ICONS["map-pin"]}
            {place.address}
          </div>
          <div className="my-6 flex flex-col items-center justify-between gap-1 rounded-2xl bg-gray-200 p-2 sm:flex-row sm:gap-4 md:p-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl">Your booking information:</p>
              <BookingDates checkIn={checkIn} checkOut={checkOut} />
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-primary p-6 text-white">
              <p>Total price:</p>
              <span className="text-3xl">{price}</span>
            </div>
          </div>
          <PlaceImageGallery photos={place.photos} title={place.title} />
        </>
      )}
    </div>
  );
};

export default SingleBookingPage;
