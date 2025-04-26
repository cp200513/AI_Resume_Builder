import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center p-3">
      <SignIn />
    </div>
  );
};

export default SignInPage;
