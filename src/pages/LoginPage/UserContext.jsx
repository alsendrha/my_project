import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const [userData, setUserData] = useState(initialUserData);
  return <UserContext.Provider value={{ userData, setUserData }} {...props} />;
}
