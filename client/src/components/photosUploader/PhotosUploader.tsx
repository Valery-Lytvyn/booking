import React, { useState } from "react";
import axios from "axios";
import CustomInput from "../ui/CustomInput";
import { PhotosUploaderProps } from "../../types";
import { SVG_ICONS } from "../../data";
import PlaceImage from "../PlaceImage";

const PhotosUploader: React.FC<PhotosUploaderProps> = ({
  photos,
  handlerAddedNewPhoto,
  updatePhotos,
}) => {
  const [photoLink, setPhotoLink] = useState("");

  const handlePhotoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoLink(e.target.value);
  };

  const addPhotoByLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    handlerAddedNewPhoto([filename]);
    setPhotoLink("");
  };

  const removePhoto = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    photoName: string,
  ) => {
    e.preventDefault();
    updatePhotos([...photos.filter((photo) => photo !== photoName)]);
  };

  const changeMainPhoto = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    photoName: string,
  ) => {
    e.preventDefault();
    updatePhotos([photoName, ...photos.filter((photo) => photo !== photoName)]);
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
    }
    const response = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { data: filenames } = response;
    handlerAddedNewPhoto([...filenames]);
  };

  return (
    <div>
      <div className="flex gap-2">
        <CustomInput
          id="photoLink"
          value={photoLink}
          placeholder="Add using a link ...jpg"
          type="text"
          handleInputChange={handlePhotoLink}
        />
        <button
          type="submit"
          className="rounded-2xl border bg-gray-200 px-4  text-gray-600"
          aria-label="Add photo"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos.length
          ? photos.map((photoLink: string, index) => (
              <div className="relative flex h-32" key={photoLink}>
                <PlaceImage fileName={photoLink} variant="rounded-2xl" />
                <button
                  className={`absolute bottom-1 left-1 rounded-md bg-black/50 px-2 py-1 ${index === 0 ? "text-red-600" : "text-white"}`}
                  onClick={(e) => changeMainPhoto(e, photoLink)}
                  aria-label="Change main photo"
                >
                  {SVG_ICONS.star}
                </button>
                <button
                  className="absolute bottom-1 right-1 rounded-md bg-black/50 px-2 py-1 text-white"
                  onClick={(e) => removePhoto(e, photoLink)}
                  aria-label="Delete photo"
                >
                  {SVG_ICONS.trash}
                </button>
              </div>
            ))
          : null}
        <label className="flex h-32 items-center justify-center gap-1  rounded-2xl border bg-transparent p-8 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          {SVG_ICONS.upload}
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotosUploader;
