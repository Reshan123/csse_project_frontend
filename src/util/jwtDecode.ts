import { jwtDecode, JwtPayload } from "jwt-decode";
import { getAuthToken } from "../api/Register/LoginApi";

export interface DecodedToken extends JwtPayload {
    id: string; 
    sub: string;
    email: string;
}

export const getUserIdFromJwtCookie = (): DecodedToken | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded; 
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};
