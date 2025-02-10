import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { FilesResponse, Folder } from "./features/directories/folderSlice";
import { debounce } from "@mui/material";

type OpenComponentsState = {
  [key: string]: boolean;
};

// Define types for AuthContext
interface AuthContextType {
  profile: string;
  total_size: number;
  used: number;
  search: string;
  isGridMode: boolean;
  usedStorage: number;
  activeFolder: string;
  files: FilesResponse | null;
  parentFolder: Folder | null;
  isAccountOpen: boolean;
  isAuthenticated: boolean;
  reGetProfile: boolean;
  isOpenComponent: OpenComponentsState;
  login: () => void;
  signup: () => void;
  logout: () => void;
  setProfile: any;
  debouncedSetSearch: (value: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsGridMode: (isGridMode: boolean) => void;
  setActiveFolder: (activeFolder: string) => void;
  setParentFolder: (component: Folder) => void;
  setFiles: (component: FilesResponse | null) => void;
  setTotal_size: React.Dispatch<React.SetStateAction<number>>;
  setUsed: React.Dispatch<React.SetStateAction<number>>;
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
  const [used, setUsed] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [total_size, setTotal_size] = useState(0);
  const [profile, setProfile] = useState<string>("");
  const [reGetProfile, setReGetProfile] = useState(false);
  const [usedStorage, setUsedStorage] = useState<number>(0);
  const [activeFolder, setActiveFolder] = useState("allFiles");
  const [isGridMode, setIsGridMode] = useState<boolean>(false);
  const [files, setFiles] = useState<FilesResponse | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [parentFolder, setParentFolder] = useState<Folder | null>(null);
  const [isOpenComponent, setOpenComponent] = useState<OpenComponentsState>({
    share: false,
    upload: false,
    newFolder: false,
    newExcel: false,
    newDocs: false,
    reName: false,
    meta: false,
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
    localStorage.removeItem("parent_folder_id");
  };

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        used,
        setUsed,
        login,
        signup,
        logout,
        files,
        profile,
        search,
        setSearch,
        setFiles,
        setProfile,
        total_size,
        setTotal_size,
        activeFolder,
        setActiveFolder,
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
        debouncedSetSearch,
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
