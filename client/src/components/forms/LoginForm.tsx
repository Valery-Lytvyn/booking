import React, { useContext, useState } from "react";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";
import PassInput from "../ui/PassInput";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import { UserContext } from "../../providers/ContextProvider";
import { toast } from "react-toastify";

const defaultFormData = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState(defaultFormData);
  const [isRedirect, setIsRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          loginData,
        },
        { withCredentials: true },
      );

      setUser(data);
      toast.success("Login successful");
      setIsRedirect(true);
    } catch (error) {
      console.log("Login error: ", error);
      toast.error("Login failed");
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.index} />;
  }

  return (
    <form
      className=" relative mx-auto max-w-md sm:min-w-[448px]"
      onSubmit={(e) => loginUser(e)}
    >
      <CustomInput
        id="email"
        type="email"
        placeholder="your@email.com"
        value={loginData.email}
        handleInputChange={handleInputChange}
      />
      <PassInput
        id="password"
        placeholder="password"
        value={loginData.password}
        handleInputChange={handleInputChange}
      />
      <CustomButton buttonName="login" type="submit" variant="bg-primary" />
    </form>
  );
};

export default LoginForm;
