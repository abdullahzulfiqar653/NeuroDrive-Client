// import { useMutation } from 'react-query';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// interface UseFileLoaderProps {
//   fileType: 'pdf' | 'excel' | 'word';
//   fileUrl: string;
//   fileName: string;
//   viewerRef: any; // Reference to the Syncfusion component
// }

// const useFileLoader = ({ fileType, fileUrl, fileName, viewerRef }: UseFileLoaderProps) => {
//   const { mutate, isLoading, isError, error } = useMutation(
//     async () => {
//       const response = await axios.get(fileUrl, { responseType: 'blob' });
//       const arrayBuffer = await response.data.arrayBuffer();
//       return {arrayBuffer,response};
//     },
//     {
//       onSuccess: ({arrayBuffer,response}) => {
//         if (viewerRef?.current) {
//           if (fileType === 'pdf') {
//             const uint8Array = new Uint8Array(arrayBuffer);
//             viewerRef.current?.load(uint8Array, fileName);
//             toast.success("PDF loaded successfully!");
//           }
//           else if (fileType === 'excel') {
//             const file = new File([response.data], fileName, {
//                 type: response.headers['content-type'],
//               });
//                 viewerRef.current.open({ file });
//                 toast.success("Document loaded successfully!");
//           } 
//           else if (fileType === 'word') {
//             const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
//             viewerRef.current.documentEditor.open(base64String);
//             toast.success("Document loaded successfully!");
//             // const sfdtContent = viewerRef.current.documentEditor.serialize();
//             // console.log("SFDT Content:", sfdtContent);
//             // toast.success("Document converted to SFDT!");
//           }
//         }
//       },
//       onError: (error) => {
//         console.error(`Error loading ${fileType.toUpperCase()} file:`, error);
//       },
//     }
//   );

//   const loadFile = () => {
//     if (fileUrl) {
//       mutate();
//     }
//   };

//   return { loadFile, isLoading, isError, error };
// };

// export default useFileLoader;

import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef, useEffect } from 'react';

interface UseFileLoaderProps {
  fileType: 'pdf' | 'excel' | 'word';
  fileUrl: string;
  fileName: string;
  viewerRef: any; // Reference to the Syncfusion component
}

const useFileLoader = ({ fileType, fileUrl, fileName, viewerRef }: UseFileLoaderProps) => {
  const fileLoadedRef = useRef(false); // Ref to track whether the file has been loaded
  const { mutate, isLoading, isError, error } = useMutation(
    async () => {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const arrayBuffer = await response.data.arrayBuffer();
      return { arrayBuffer, response };
    },
    {
      onSuccess: ({ arrayBuffer, response }) => {
        if (viewerRef?.current && !fileLoadedRef.current) {
          fileLoadedRef.current = true; // Mark the file as loaded
          if (fileType === 'pdf') {
            const uint8Array = new Uint8Array(arrayBuffer);
            viewerRef.current?.load(uint8Array, fileName);
            toast.success("PDF loaded successfully!");
          } else if (fileType === 'excel') {
            const file = new File([response.data], fileName, {
              type: response.headers['content-type'],
            });
            viewerRef.current.open({ file });
            toast.success("Excel document loaded successfully!");
          } else if (fileType === 'word') {
            const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            viewerRef.current.documentEditor.open(base64String);
            toast.success("Word document loaded successfully!");
          }
        }
      },
      onError: (error) => {
        console.error(`Error loading ${fileType.toUpperCase()} file:`, error);
        toast.error(`Error loading ${fileType.toUpperCase()} file.`);
      },
    }
  );

  // Function to load the file
  const loadFile = () => {
    if (fileUrl && !isLoading && !fileLoadedRef.current) {
      mutate();
    }
  };

  // Trigger file load when fileUrl changes
  useEffect(() => {
    fileLoadedRef.current = false; // Reset the loaded state when the fileUrl changes
    loadFile();
  }, [fileUrl]);

  return { loadFile, isLoading, isError, error };
};

export default useFileLoader;
