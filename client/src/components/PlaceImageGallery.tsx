import React, { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import { PlaceImageGalleryProps } from "../types";
import { SVG_ICONS } from "../data";
import PlaceImage from "./PlaceImage";

const PlaceImageGallery: React.FC<PlaceImageGalleryProps> = ({
  photos,
  title,
}) => {
  const [isShowAllPhotos, setIsShowAllPhotos] = useState(false);

  const showGallery = () => {
    setIsShowAllPhotos(true);
  };

  const closeGallery = () => {
    setIsShowAllPhotos(false);
  };

  if (isShowAllPhotos)
    return (
      <PhotoGallery
        closeGalleryHandler={closeGallery}
        photos={photos}
        title={title}
      />
    );

  return (
    <div className="relative">
      <div className="grid  grid-cols-1 gap-2 overflow-hidden rounded-3xl sm:grid-cols-[2fr_1fr]">
        <div className="flex bg-gray-200">
          <div className="relative aspect-square overflow-hidden">
            {photos?.[0] && (
              <PlaceImage fileName={photos?.[0]} variant="h-full" />
            )}
          </div>
        </div>
        <div className="flex   flex-col gap-2 bg-gray-200">
          <div className="relative aspect-square overflow-hidden">
            {photos?.[1] && (
              <PlaceImage fileName={photos?.[1]} variant="h-full" />
            )}
          </div>
          <div className="relative aspect-square overflow-hidden">
            {photos?.[2] && (
              <PlaceImage fileName={photos?.[2]} variant="h-full" />
            )}
          </div>
        </div>
      </div>
      <button
        aria-label="Show more photo"
        className="absolute bottom-2 right-14 rounded-xl bg-white/70 px-3 py-1 shadow-md shadow-gray-500 transition hover:bg-white"
      >
        <div className="flex items-center gap-1" onClick={showGallery}>
          {SVG_ICONS.picture}
          Show more photo
        </div>
      </button>
    </div>
  );
};

export default PlaceImageGallery;
