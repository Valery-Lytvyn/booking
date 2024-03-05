export const ROUTES = {
  index: "/",
  login: "/login",
  register: "/register",
  account: "/account",
  profile: "/account/profile",
  bookings: "/account/bookings",
  booking: (id: string | null) =>
    id ? `/account/bookings/${id}` : "/account/bookings/:id",
  places: "/account/places",
  "new-place": "/account/new-place",
  "place-editing": (id: string | null) =>
    id ? `/account/places/${id}` : `/account/places/:id`,
  place: (id: string | null) => (id ? `/place/${id}` : `/place/:id`),
};
