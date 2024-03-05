import React, { useEffect, useState } from "react";
import PlaceForm from "../components/forms/PlaceForm";
import { PlaceDataType } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { defaultPlaceData } from "../data";

const PlaceEditingPage: React.FC = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<PlaceDataType>(defaultPlaceData);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      const getPlaceData = async () => {
        try {
          const response = await axios.get(`/places/${id}`);
          setPlaceData({ ...response.data });
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      getPlaceData();
    }
  }, [id]);

  const savePlace = async (
    e: React.FormEvent<HTMLFormElement>,
    placeData: PlaceDataType,
  ) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put("/places", { id, ...placeData });
        setIsRedirect(true);
      }
    } catch (error) {
      console.error("Error saving place:", error);
      toast.error("Error saving place");
    }
  };

  return (
    <PlaceForm data={placeData} savePlace={savePlace} isRedirect={isRedirect} />
  );
};

export default PlaceEditingPage;
