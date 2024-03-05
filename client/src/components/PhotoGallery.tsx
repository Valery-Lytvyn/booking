import React from "react";
import { PhotoGalleryProps } from "../types";
import PlaceImage from "./PlaceImage";
import { SVG_ICONS } from "../data";

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  closeGalleryHandler,
  photos,
  title,
}) => {
  return (
    <div className="absolute left-0 top-0 min-h-full w-full bg-gray-100 p-8">
      <div className="grid gap-4 p-8">
        <h2 className="text-3xl">Photo of {title}</h2>
        <button
          aria-label="Close Gallery"
          className="fixed right-16 top-16 flex items-center gap-1 rounded-md bg-white/90 px-3 py-1 shadow-md shadow-gray-900 transition hover:bg-white"
          onClick={closeGalleryHandler}
        >
          Close gallery
          {SVG_ICONS.close}
        </button>
        {photos.length > 0 &&
          photos.map((photo) => <PlaceImage fileName={photo} />)}
      </div>
    </div>
  );
};

export default PhotoGallery;
