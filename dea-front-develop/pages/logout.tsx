import { NextPage } from "next";
import { signOut } from "next-auth/client";
import { useEffect } from "react";

const Logout: NextPage = () => {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: `${window.location.origin}/login` });
  }, []);
  return <span>&nbsp;</span>;
};

export default Logout;
