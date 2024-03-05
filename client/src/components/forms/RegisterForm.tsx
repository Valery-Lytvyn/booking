import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";
import PassInput from "../ui/PassInput";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../routing/routes";
import { toast } from "react-toastify";

const defaultFormData = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm: React.FC = () => {
  const [registerData, setRegisterData] = useState(defaultFormData);
  const [isRedirect, setIsRedirect] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        registerData,
      });
      toast.success("Registration successful");
      setIsRedirect(true);
    } catch (error) {
      console.log("Error registering", error);
      toast.error("Registration failed");
    }
  };

  if (isRedirect) {
    return <Navigate to={ROUTES.login} />;
  }

  return (
    <form
      className=" relative mx-auto max-w-md"
      onSubmit={(e) => registerUser(e)}
    >
      <CustomInput
        id="name"
        type="text"
        placeholder="Your Name"
        value={registerData.name}
        handleInputChange={handleInputChange}
      />
      <CustomInput
        id="email"
        type="email"
        placeholder="your@email.com"
        value={registerData.email}
        handleInputChange={handleInputChange}
      />
      <PassInput
        id="password"
        placeholder="password"
        value={registerData.password}
        handleInputChange={handleInputChange}
      />

      <CustomButton buttonName="register" type="submit" variant="bg-primary" />
    </form>
  );
};

export default RegisterForm;
