import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import useAuth from "../hooks/useAuth";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

export default function Authpage() {
  const [signin, setSignin] = useState(true);
  const isLoggedIn = useAuth();
  return (
    <Layout>
      {signin ? (
        <>
          <SignIn />{" "}
          <p className="text-center my-5">
            Don't have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-blue-500 underline"
              onClick={() => setSignin(!signin)}
            >
              Signup Here
            </span>
          </p>
        </>
      ) : (
        <>
          <SignUp />{" "}
          <p className="text-center my-5">
            Already have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-blue-500 underline"
              onClick={() => setSignin(!signin)}
            >
              Signin Here
            </span>
          </p>
        </>
      )}
    </Layout>
  );
}
