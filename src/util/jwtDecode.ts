// utils/jwtUtils.ts
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getAuthToken } from "../api/Register/LoginApi";

interface DecodedToken extends JwtPayload {
  id: string; 
}

export const getUserIdFromJwtCookie = (): string | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.id; 
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};
