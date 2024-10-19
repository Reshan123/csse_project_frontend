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

  useEffect(() => {
    const cookieRole = getRole();
    if (cookieRole) {
      setRole(cookieRole);
    }
  }, []);

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
