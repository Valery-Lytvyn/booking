import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../routing/routes";

const LoginPage: React.FC = () => {
  return (
    <div className="flex grow flex-col items-center justify-around">
      <div className="mb-32">
        <h1 className="my-4 text-center text-4xl">Login</h1>
        <LoginForm />
        <div className="py-2 text-center text-gray-500">
          Don't have an account yet?
          <Link to={ROUTES.register} className="pl-2 text-black underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
