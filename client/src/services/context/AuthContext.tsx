import { createContext, useContext, useState } from "react";
/* import { UserDataGet } from "../requests/User/getUser"; */

type Props = {
  children: React.ReactNode;
};

export interface UserContextType {
  /* user: UserDataGet | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDataGet | undefined>>; */
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider: React.FC<Props> = ({ children }) => {
  /* const [user, setUser] = useState<UserDataGet>(); */
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        /* user,
        setUser, */
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext) as UserContextType;
  return context;
}

export { AuthProvider, useAuth };