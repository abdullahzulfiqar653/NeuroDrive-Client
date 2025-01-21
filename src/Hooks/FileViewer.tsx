import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../FileContext';

interface FileViewerProps {
  fileUrl: string;
  fileType: 'excel' | 'word' | 'pdf';
  fileName: string;
}

export const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, fileType, fileName }) => {
  const navigate = useNavigate();
  const { setFileDetails } = useFileContext();

  useEffect(() => {
    if (fileUrl && fileType && fileName) {
      setFileDetails(fileUrl, fileType, fileName);
      navigate('/text-file');
    }
  }, [fileUrl, fileType, fileName, navigate, setFileDetails]);

  return null;
};
