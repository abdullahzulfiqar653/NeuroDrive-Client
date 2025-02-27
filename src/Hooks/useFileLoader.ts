import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UseFileLoaderProps {
  fileType: 'pdf' | 'excel' | 'word';
  fileUrl: string;
  fileName: string;
  viewerRef: any; 
}

const useFileLoader = ({ fileType, fileUrl, fileName, viewerRef }: UseFileLoaderProps) => {
  const { mutate, isLoading, isError, error } = useMutation(
    async () => {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const arrayBuffer = await response.data.arrayBuffer();
      return {arrayBuffer,response};
    },
    {
      onSuccess: ({arrayBuffer,response}) => {
        if (viewerRef?.current) {
          if (fileType === 'pdf') {
            const uint8Array = new Uint8Array(arrayBuffer);
            viewerRef.current?.load(uint8Array, fileName);
            toast.success("PDF loaded successfully!");
          }
          else if (fileType === 'excel') {

          const contentType = response.headers['content-type'];
           
          if (contentType === "text/html") {
            return;
          }
          
          const fileBlob = new Blob([response.data], {
              type: response.headers['content-type'],
          });
          
          const updatedFileName = fileName || "Sample.xlsx";
          const file = new File([fileBlob], updatedFileName, {
              type: fileBlob.type
          });
          
          viewerRef.current.open({ file });
          toast.success("Document loaded successfully!");          
          } 
          else if (fileType === 'word') {
            const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            viewerRef.current.documentEditor.open(base64String);
            toast.success("Document loaded successfully!");
          }
        }
      },
      onError: (error) => {
        console.error(`Error loading ${fileType.toUpperCase()} file:`, error);
      },
    }
  );

  const loadFile = () => {
    if (fileUrl) {
      mutate();
    }
  };

  return { loadFile, isLoading, isError, error };
};

export default useFileLoader;

