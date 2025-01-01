import React, { createContext, useState, useContext, ReactNode } from "react";

type OpenComponentsState = {
  [key: string]: boolean | null; 
};

// Define types for AuthContext
interface AuthContextType {
  isAccountOpen: boolean;
  isOpenComponent: OpenComponentsState;
  toggleComponent: (component: string) => void;
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

  // Function to toggle a specific component
  const toggleComponent = (component: string) => {
    setOpenComponent((prevState) => ({
      ...prevState,
      [component]: !prevState[component],
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
