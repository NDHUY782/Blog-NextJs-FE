"use client";

import RegisterForm from "@/app/(auth)/register/register-form";

const registerPage = () => {
  return (
    <div>
      <h1 className="text-xl text-center">Sign Up</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default registerPage;
