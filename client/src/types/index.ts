// Form
export interface CustomInputProps {
  id: string;
  type?: "text" | "password" | "email" | "number" | "date";
  placeholder: string;
  value: string | number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomTextareaProps {
  id: string;
  placeholder: string;
  value: string;
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface CustomButtonProps {
  type: "submit" | "button";
  buttonName: string;
  clickHandler?: () => void;
  variant: string;
}

export interface UserType {
  _id: string;
  email: string;
  name: string;
  password: string;
}

export interface PlaceFormProps {
  data: PlaceDataType;
  savePlace: (
    e: React.FormEvent<HTMLFormElement>,
    placeData: PlaceDataType,
  ) => void;
  isRedirect: boolean;
}
//Providers
export interface ProviderProps {
  children: React.ReactNode;
}

//PlacesPage
export interface PlaceDataType {
  _id: string;
  owner?: string;
  title: string;
  address: string;
  description: string;
  photos: string[] | [];
  perks: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  price: number;
}

export interface PhotosUploaderProps {
  photos: string[] | [];
  handlerAddedNewPhoto: (arg: string[] | []) => void;
  updatePhotos: (arg: string[] | []) => void;
}

export interface PerksProps {
  handlerChangePerks: (arg: string) => void;
  checkedPerks: string[];
}
export interface PerkItemProps {
  id: string;
  perk: string;
  name: string;
  icon: JSX.Element;
  isChecked: boolean;
  handlerChangePerks: (arg: string) => void;
}

//AccountPage
export interface AccountNavProps {
  subPage: string;
}

//PlaceItemProps

export interface PlaceItemProps {
  place: PlaceDataType;
}

//PhotoGalleryProps
export interface PhotoGalleryProps {
  closeGalleryHandler: () => void;
  photos: string[];
  title: string;
}

export interface PlaceImageProps {
  fileName: string;
  variant?: string;
}

export interface BookingWidgetProps {
  id: string;
  price: number;
}

export interface BookingType {
  _id: string;
  checkIn: string;
  checkOut: string;
  fullName: string;
  numberOfGuests: number;
  place: PlaceDataType;
  price: string;
  user: string;
}

export interface BookingDatesProps {
  checkIn: string;
  checkOut: string;
  variant?: string;
}

export interface PlaceImageGalleryProps {
  photos: string[];
  title: string;
}

export interface UserContextType {
  ready: boolean;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}
