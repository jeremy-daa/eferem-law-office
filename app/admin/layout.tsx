import AuthProvider from "@/context/AuthProvider";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default layout;
