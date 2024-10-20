import React, { createContext, ReactNode, useState, useEffect } from "react";
import { getRole } from "../api/Register/LoginApi";
import Loader from "../components/Loader/Loader";

interface UserRoleType {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean
}

export const UserRoleContext = createContext<UserRoleType | undefined>(
  undefined
);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const cookieRole = getRole();
    if (cookieRole) {
      setRole(cookieRole);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(role);
  }, [role]);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserRoleContext.Provider value={{ role, setRole, loading }}>
      {children}
    </UserRoleContext.Provider>
  );
};
