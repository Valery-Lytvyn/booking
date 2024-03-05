import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing/router";
import axios from "axios";
import { UserContextProvider } from "./providers/ContextProvider";
import { ToastProvider } from "./providers/ToastProvider";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ToastProvider />
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
