import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Folder } from "./features/directories/folderSlice";

type OpenComponentsState = {
  [key: string]: boolean;
};

// Define types for AuthContext
interface AuthContextType {
  profile: string;
  isGridMode: boolean;
  usedStorage: number;
  parentFolder: Folder | null;
  isAccountOpen: boolean;
  isAuthenticated: boolean;
  reGetProfile: boolean;
  isOpenComponent: OpenComponentsState;
  login: () => void;
  signup: () => void;
  logout: () => void;
  setProfile: any;
  setIsGridMode: (isGridMode: boolean) => void;
  setParentFolder: (component: Folder) => void;
  setUsedStorage: React.Dispatch<React.SetStateAction<number>>;
  toggleComponent: (component: string, isOpen?: boolean) => void;
  setReGetProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>("");
  const [usedStorage, setUsedStorage] = useState<number>(0);
  const [reGetProfile, setReGetProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isGridMode, setIsGridMode] = useState<boolean>(false);
  const [parentFolder, setParentFolder] = useState<Folder | null>(null);
  const [isOpenComponent, setOpenComponent] = useState<OpenComponentsState>({
    share: false,
    upload: false,
    newFolder: false,
    newExcel: false,
    newDocs: false,
    reName: false,
  });

  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const parentId = localStorage.getItem("parent_id");
    if (parentId) {
      setParentFolder(
        (prev) =>
          ({
            ...prev,
            id: parentId,
          } as Folder)
      );
    }
  }, []);

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
    window.location.reload();
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        profile,
        setProfile,
        isGridMode,
        usedStorage,
        setUsedStorage,
        parentFolder,
        setIsGridMode,
        isAccountOpen,
        reGetProfile,
        setReGetProfile,
        setParentFolder,
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
