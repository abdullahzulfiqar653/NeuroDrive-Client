import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../FileContext';

export const FileViewer = ({ fileUrl, fileType, fileName }: any) => {
  const navigate = useNavigate();
  const { setFileDetails } = useFileContext();

  useEffect(() => {
    setFileDetails(fileUrl, fileType, fileName);

    if (fileType === 'excel') {
      navigate(`/text-file`);
    } else if (fileType === 'word') {
      navigate(`/text-file`);
    }
  }, [fileType, fileUrl, fileName, navigate, setFileDetails]);

  return null;
};
