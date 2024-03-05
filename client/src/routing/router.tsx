import { createHashRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  LoginPage,
  HomePage,
  RegisterPage,
  AccountPage,
  BookingsPage,
  PlacesPage,
  PlaceEditingPage,
  CreatePlacePage,
  ProfilePage,
  SinglePlacePage,
  SingleBookingPage,
  ErrorPage,
} from "../pages";
import { ROUTES } from "./routes";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.register,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.place(null),
        element: <SinglePlacePage />,
      },
      {
        path: ROUTES.account,
        element: <AccountPage />,
        children: [
          {
            path: ROUTES.profile,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.bookings,
            element: <BookingsPage />,
          },
          {
            path: ROUTES.booking(null),
            element: <SingleBookingPage />,
          },
          {
            path: ROUTES.places,
            element: <PlacesPage />,
          },
          {
            path: ROUTES["place-editing"](null),
            element: <PlaceEditingPage />,
          },
          {
            path: ROUTES["new-place"],
            element: <CreatePlacePage />,
          },
        ],
      },
    ],
  },
]);
