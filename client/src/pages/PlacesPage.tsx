import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddPlaceLink from "../components/ui/AddPlaceLink";
import { PlaceDataType } from "../types";
import { ROUTES } from "../routing/routes";
import PlaceImage from "../components/PlaceImage";
import { getData } from "../fetching";

const PlacesPage: React.FC = () => {
  const [placesData, setPlacesData] = useState<PlaceDataType[]>([]);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data: PlaceDataType[] = await getData("/user-places");
        setPlacesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };
    getPlaces();
  }, []);

  return (
    <div className="my-4 flex flex-col  gap-2">
      {placesData &&
        placesData.length > 0 &&
        placesData.map(({ _id, title, photos, description }) => (
          <Link
            to={ROUTES["place-editing"](_id ? _id : "")}
            key={_id}
            className="flex cursor-pointer gap-4 rounded-2xl bg-gray-100 p-4"
          >
            <div className="relative flex  aspect-square h-32 bg-gray-300">
              {photos.length > 0 && (
                <PlaceImage fileName={photos[0]} variant="rounded-2xl" />
              )}
            </div>
            <div>
              <h2 className="text-xl">{title}</h2>
              <p className="mt-2 text-sm">{description}</p>
            </div>
          </Link>
        ))}
      <AddPlaceLink />
    </div>
  );
};

export default PlacesPage;
