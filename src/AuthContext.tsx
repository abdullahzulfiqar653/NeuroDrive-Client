import React, { createContext, useState, useContext, ReactNode } from "react";

type OpenComponentsState = {
  [key: string]: boolean;
};

// Define types for AuthContext
interface AuthContextType {
  isGridMode: boolean;
  isAccountOpen: boolean;
  isAuthenticated: boolean;
  isOpenComponent: OpenComponentsState;
  login: () => void;
  signup: () => void;
  logout: () => void;
  setIsGridMode: (isGridMode: boolean) => void;
  toggleComponent: (component: string, isOpen?: boolean) => void;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isGridMode, setIsGridMode] = useState<boolean>(false);
  const [isOpenComponent, setOpenComponent] = useState<OpenComponentsState>({
    share: false,
    newFolder: false,
    newExcel: false,
    newDocs: false,
  });

  const toggleComponent = (component: string, isOpen?: boolean) => {
    setOpenComponent((prevState) => ({
      ...prevState,
      [component]: isOpen !== undefined ? isOpen : !prevState[component],
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
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        isGridMode,
        setIsGridMode,
        isAccountOpen,
        setIsAccountOpen,
        isOpenComponent,
        toggleComponent,
        isAuthenticated,
      }}
    >
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
