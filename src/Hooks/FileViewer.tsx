import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FileViewer = ({ fileUrl, fileType, fileName }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (fileType === 'excel') {
      navigate(`/text-file?type=excel&fileUrl=${fileUrl}&fileName=${fileName}`); 
    } else if (fileType === 'word') {
      navigate(`/text-file?type=word&fileUrl=${fileUrl}&fileName=${fileName}`); 
    }
  }, [fileType, fileUrl, fileName, navigate]);

  return null; 
};
