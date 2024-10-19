import React, { createContext, ReactNode, useState, useEffect } from "react";
import { getRole } from "../api/Register/LoginApi";

interface UserRoleType {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
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
    return <div>Loading...</div>;
  }

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
