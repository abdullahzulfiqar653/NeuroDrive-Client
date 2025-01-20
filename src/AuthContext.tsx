import React, { createContext, useState, useContext, ReactNode } from "react";

type OpenComponentsState = {
  [key: string]: boolean;
};

// Define types for AuthContext
interface AuthContextType {
  isAccountOpen: boolean;
  isAuthenticated: boolean;
  isOpenComponent: OpenComponentsState;
  login: () => void;
  signup: () => void;
  logout: () => void;
  toggleComponent: (component: string) => void;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isOpenComponent, setOpenComponent] = useState<OpenComponentsState>({
    share: false,
    newFolder: false,
    newExcel: false,
    newDocs: false,
  });

  // Function to toggle a specific component
  const toggleComponent = (component: string) => {
    setOpenComponent((prevState) => ({
      ...prevState,
      [component]: !prevState[component],
    }));
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const signup = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{login, signup, logout, isAccountOpen, setIsAccountOpen ,isOpenComponent, toggleComponent, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
