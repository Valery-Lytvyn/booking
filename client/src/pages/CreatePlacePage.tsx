import React, { useState } from "react";
import { toast } from "react-toastify";
import PlaceForm from "../components/forms/PlaceForm";
import { PlaceDataType } from "../types";
import { createId } from "../helpers";
import { postPlace } from "../fetching";
import { defaultPlaceData } from "../data";

const CreatePlacePage: React.FC = () => {
  const [isRedirect, setIsRedirect] = useState(false);

  const savePlace = async (
    e: React.FormEvent<HTMLFormElement>,
    placeData: PlaceDataType,
  ) => {
    e.preventDefault();
    try {
      await postPlace("/places", placeData);
      setIsRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
      toast.error("Error saving place");
    }
  };

  return (
    <PlaceForm
      data={{ ...defaultPlaceData, _id: createId() }}
      savePlace={savePlace}
      isRedirect={isRedirect}
    />
  );
};

export default CreatePlacePage;
