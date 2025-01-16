
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FileContextType {
  fileUrl: string | null;
  fileType: string | null;
  fileName: string | null;
  setFileDetails: (fileUrl: string, fileType: string, fileName: string) => void;
  FileType: (fileType: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const setFileDetails = (fileUrl: string, fileType: string, fileName: string) => {
    setFileUrl(fileUrl);
    setFileType(fileType);
    setFileName(fileName);
  };

  const FileType = (fileType: string) => {
    setFileType(fileType);
  };

  return (
    <FileContext.Provider value={{ fileUrl, fileType, fileName, setFileDetails, FileType }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};
