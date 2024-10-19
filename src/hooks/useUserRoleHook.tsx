import { useContext } from "react";
import { UserRoleContext } from "../contexts/UserRole";

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
