import { useEffect, useRef, useState } from 'react';
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  FormFields,
  FormDesigner,
  Inject,
} from '@syncfusion/ej2-react-pdfviewer';
import axios from 'axios';
import { toast } from 'react-toastify';

const PDF = ({ fileUrl, fileName }: any) => {
  const viewerRef = useRef<PdfViewerComponent | null>(null);
  const [isViewerReady, setIsViewerReady] = useState(false);

  const loadPdfFromS3 = async () => {
    setTimeout(async () => {
      if (fileUrl && viewerRef.current) {
        try {
          const response = await axios.get(fileUrl, { responseType: 'blob' });
          const arrayBuffer = await response.data.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          viewerRef.current.load(uint8Array, fileName);
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      }
    }, 1000); 
  };
  

  const handleToolbarClick = async (args: any) => {
    console.log('Toolbar item clicked:', args);
    if (args && args.item && args.item.id === 'container_download') { 
      if (viewerRef.current) {
        try {
          const blob = await viewerRef.current.saveAsBlob();
          const formData = new FormData();
          formData.append('file', blob, fileName);
          const response = await axios.post('/api/upload-pdf', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response, 'response');
          toast.success('PDF sent to the backend successfully!');
        } catch (error) {
          console.error('Error sending the PDF:', error);
          toast.error('Failed to send the PDF to the backend');
        }
      }
    }
  };

  useEffect(() => {
    if (viewerRef.current) {
      setIsViewerReady(true);
    }
  }, []);

  useEffect(() => {
    if (isViewerReady && fileUrl) {
      loadPdfFromS3();
    }
  }, [isViewerReady, fileUrl]);

  return (
    <div className="control-section">
      <PdfViewerComponent
        id="container"
        ref={viewerRef}
        resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib"
        style={{ height: '170vw' }}
        toolbarClick={handleToolbarClick}
      >
        <Inject
          services={[
            Toolbar,
            Magnification,
            Navigation,
            Annotation,
            LinkAnnotation,
            BookmarkView,
            ThumbnailView,
            Print,
            TextSelection,
            TextSearch,
            FormDesigner,
            FormFields,
          ]}
        />
      </PdfViewerComponent>
    </div>
  );
};

export default PDF;
