import React, { useEffect, useState } from "react";
import { PlaceDataType } from "../types";
import PlaceItem from "../components/PlaceItem";
import { getData } from "../fetching";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceDataType[] | []>([]);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data: PlaceDataType[] = await getData("/places");
        setPlaces(data);
      } catch (error) {
        console.log("Error getting places", error);
        toast.error("Error getting places");
      }
    };
    getPlaces();
  }, []);

  return (
    <div className="lg-grid-col-6 mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
      {places &&
        places.length > 0 &&
        places.map((place) => <PlaceItem key={place._id} place={place} />)}
    </div>
  );
};

export default HomePage;
