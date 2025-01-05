import React, { createContext, useState, useContext, ReactNode } from "react";

type OpenComponentsState = {
  [key: string]: boolean; 
};

// Define types for AuthContext
interface AuthContextType {
  isAccountOpen: boolean;
  isOpenComponent: OpenComponentsState;
  toggleComponent: (component: string, isOpen?: boolean) => void;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isOpenComponent, setOpenComponent] = useState<OpenComponentsState>({
    share: false,
    newFolder: false,
    newExcel: false,
    newDocs: false,
  });

  const toggleComponent = (component: string, isOpen?: boolean) => {
    setOpenComponent(prevState => ({
      ...prevState,
      [component]: isOpen !== undefined ? isOpen : !prevState[component]
    }));
  };

  return (
    <AuthContext.Provider value={{ isAccountOpen, setIsAccountOpen ,isOpenComponent, toggleComponent}}>
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
