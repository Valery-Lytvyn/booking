import React from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../routing/routes";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex grow flex-col items-center justify-center ">
      <div className="mb-32">
        <h1 className="my-4 text-center text-4xl">Register</h1>
        <RegisterForm />
        <div className="py-2 text-center text-gray-500">
          Already a member?
          <Link to={ROUTES.login} className="pl-2 text-black underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
