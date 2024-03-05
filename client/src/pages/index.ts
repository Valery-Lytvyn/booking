import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage.tsx"));
const LoginPage = lazy(() => import("./LoginPage.tsx"));
const RegisterPage = lazy(() => import("./RegisterPage.tsx"));
const AccountPage = lazy(() => import("./AccountPage.tsx"));
const ProfilePage = lazy(() => import("./ProfilePage.tsx"));
const BookingsPage = lazy(() => import("./BookingsPage.tsx"));
const PlacesPage = lazy(() => import("./PlacesPage.tsx"));
const PlaceEditingPage = lazy(() => import("./PlaceEditingPage.tsx"));
const CreatePlacePage = lazy(() => import("./CreatePlacePage.tsx"));
const SinglePlacePage = lazy(() => import("./SinglePlacePage.tsx"));
const SingleBookingPage = lazy(() => import("./SingleBookingPage.tsx"));
const ErrorPage = lazy(() => import("./ErrorPage.tsx"));
export {
  ErrorPage,
  HomePage,
  LoginPage,
  RegisterPage,
  AccountPage,
  ProfilePage,
  BookingsPage,
  SingleBookingPage,
  PlacesPage,
  PlaceEditingPage,
  CreatePlacePage,
  SinglePlacePage,
};
