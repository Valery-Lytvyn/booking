import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../providers/ContextProvider";
import Loader from "../components/loader/Loader";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routing/routes";
import CustomButton from "../components/ui/CustomButton";

const ProfilePage: React.FC = () => {
  const { ready, user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
    } catch (error) {
      console.log("Logout error", error);
      toast.error("Logout error");
    }
  };

  if (!ready) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={ROUTES.login} />;
  }
  const { name, email } = user;
  return (
    <div>
      <div className="my-6 flex flex-col items-center gap-2">
        <p className="text-center">
          Logged in as {name} ({email})
        </p>
        <CustomButton
          type="button"
          buttonName="logout"
          variant="bg-primary max-w-lg"
          clickHandler={logout}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
