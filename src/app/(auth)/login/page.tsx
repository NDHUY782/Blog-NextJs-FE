"use client";

import LoginForm from "@/app/(auth)/login/login-form";

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-xl text-center">Sign In</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
