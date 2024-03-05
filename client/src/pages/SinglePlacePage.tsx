import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getData } from "../fetching";
import { PlaceDataType } from "../types";
import Loader from "../components/loader/Loader";
import BookingWidget from "../components/BookingWidget";
import PlaceImageGallery from "../components/PlaceImageGallery";
import { SVG_ICONS } from "../data";

const SinglePlacePage: React.FC = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<PlaceDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PlaceDataType = await getData(`/places/${id}`);
        setPlaceData(data);
      } catch (error) {
        console.error("Error fetching place data:", error);
        toast.error("Error fetching place data");
      }
    };
    fetchData();
  }, [id]);

  if (!placeData) return <Loader />;

  const {
    _id,
    title,
    address,
    photos,
    price,
    description,
    checkIn,
    checkOut,
    maxGuests,
    extraInfo,
  } = placeData;

  return (
    <div>
      <div className="-mx-4 mt-8 flex flex-col gap-2 bg-gray-100 p-8 sm:-mx-16 lg:-mx-32">
        {Object.keys(placeData).length > 0 && (
          <>
            <h1 className="text-3xl">{title}</h1>
            <div className="flex items-center gap-1 font-semibold underline">
              {SVG_ICONS["map-pin"]}
              {address}
            </div>
            <PlaceImageGallery photos={photos} title={title} />
          </>
        )}

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-around gap-2">
            <div>
              <h2 className="text-2xl font-semibold">Description</h2>
              <p>{description}</p>
            </div>
            <p>Check-in: {checkIn}</p>
            <p>Check-out: {checkOut}</p>
            <p>Max numbers of guests: {maxGuests}</p>
          </div>
          <BookingWidget price={price} id={_id} />
        </div>
      </div>
      <div className="-mx-4 px-8 py-4 sm:-mx-16 lg:-mx-32">
        <h2 className="text-2xl font-semibold">Extra Info</h2>
        <p className="text-sm leading-4 text-gray-700">{extraInfo}</p>
      </div>
    </div>
  );
};

export default SinglePlacePage;
