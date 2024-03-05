import React, { useEffect, useState } from "react";
import { PlaceDataType, PlaceFormProps } from "../../types";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import CustomInput from "../ui/CustomInput";
import PhotosUploader from "../photosUploader/PhotosUploader";
import CustomTextarea from "../ui/CustomTextarea";
import Perks from "../perks/Perks";
import CustomButton from "../ui/CustomButton";

const InputTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-2xl">{title}</h2>;
};
const InputDescription: React.FC<{ children: string }> = ({ children }) => {
  return <p className="text-sm text-gray-500">{children}</p>;
};

const PlaceForm: React.FC<PlaceFormProps> = ({
  data,
  savePlace,
  isRedirect,
}) => {
  const [placeData, setPlaceData] = useState<PlaceDataType>({ ...data });

  useEffect(() => {
    setPlaceData(data);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlaceData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlerAddedNewPhoto = (photos: [] | string[]) => {
    setPlaceData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...photos],
    }));
  };
  const updatePhotos = (photoArr: [] | string[]) => {
    setPlaceData((prev) => ({
      ...prev,
      photos: [...photoArr],
    }));
  };

  const handlerChangePerks = (perkName: string) => {
    setPlaceData((prev) => {
      const updatedPerks = prev.perks.includes(perkName)
        ? prev.perks.filter((p) => p !== perkName)
        : [...prev.perks, perkName];
      return { ...prev, perks: updatedPerks };
    });
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.places} />;
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        savePlace(e, placeData)
      }
    >
      <div>
        <InputTitle title="Title" />
        <InputDescription>
          Title for your place. should be short and catchy as in advertisement
        </InputDescription>
        <CustomInput
          id="title"
          value={placeData.title}
          placeholder="title, for example: My lovely apartment"
          type="text"
          handleInputChange={handleInputChange}
        />
      </div>
      <div>
        <InputTitle title="Address" />
        <InputDescription>Address to this place</InputDescription>
        <CustomInput
          id="address"
          value={placeData.address}
          placeholder="address"
          type="text"
          handleInputChange={handleInputChange}
        />
      </div>
      <InputTitle title="Photos" />
      <InputDescription>more = betters</InputDescription>
      <PhotosUploader
        photos={placeData.photos}
        handlerAddedNewPhoto={handlerAddedNewPhoto}
        updatePhotos={updatePhotos}
      />
      <div>
        <InputTitle title="Description" />
        <InputDescription>description of the place</InputDescription>
        <CustomTextarea
          id="description"
          value={placeData.description}
          placeholder="title, for example: My lovely apartment"
          handleTextareaChange={handleTextareaChange}
        />
      </div>
      <div>
        <InputTitle title="Perks" />
        <InputDescription>select all the perks of your place</InputDescription>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks
            handlerChangePerks={handlerChangePerks}
            checkedPerks={placeData.perks}
          />
        </div>
      </div>
      <div>
        <InputTitle title="Extra info" />
        <InputDescription>house rules, etc</InputDescription>
        <CustomTextarea
          id="extraInfo"
          value={placeData.extraInfo}
          placeholder="title, for example: My lovely apartment"
          handleTextareaChange={handleTextareaChange}
        />
      </div>
      <div>
        <InputTitle title="Check in&out time" />
        <InputDescription>
          add check in and out time, remember some time window for cleaning the
          room between guests
        </InputDescription>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div className="mt-2">
            <h3 className="-mb-1">Check in time</h3>
            <CustomInput
              type="number"
              value={placeData.checkIn}
              id="checkIn"
              placeholder="0"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <h3 className="-mb-1">Check out time</h3>
            <CustomInput
              type="number"
              value={placeData.checkOut}
              id="checkOut"
              placeholder="0"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <h3 className="-mb-1">Max number of guests</h3>
            <CustomInput
              type="number"
              value={placeData.maxGuests}
              id="maxGuests"
              placeholder="1"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <h3 className="-mb-1">Price</h3>
            <CustomInput
              type="number"
              value={placeData.price}
              id="price"
              placeholder="0"
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <CustomButton buttonName="Save" type="submit" variant="bg-primary" />
    </form>
  );
};

export default PlaceForm;
