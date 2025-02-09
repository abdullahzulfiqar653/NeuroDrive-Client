import { useEffect, useRef, useState } from "react";
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
} from "@syncfusion/ej2-react-pdfviewer";
import axios from "axios";
import { toast } from "react-toastify";
import useFileLoader from "../Hooks/useFileLoader";

const PDF = ({ fileUrl, fileName }: any) => {
  const viewerRef = useRef<PdfViewerComponent | null>(null);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const { loadFile } = useFileLoader({
    fileType: "pdf",
    fileUrl,
    fileName,
    viewerRef,
  });

  const handleToolbarClick = async (args: any) => {
    if (args && args.item && args.item.id === "container_download") {
      if (viewerRef.current) {
        try {
          const blob = await viewerRef.current.saveAsBlob();
          const formData = new FormData();
          formData.append("file", blob, fileName);
           await axios.post("/api/upload-pdf", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("PDF sent to the backend successfully!");
        } catch (error) {
          console.error("Error sending the PDF:", error);
          toast.error("Failed to send the PDF to the backend");
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
    setTimeout(async () => {
      if (isViewerReady && fileUrl) {
        loadFile();
      }
    }, 1000);
  }, [isViewerReady, fileUrl]);

  return (
    <div className="control-section">
      <PdfViewerComponent
        id="container"
        ref={viewerRef}
        resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib"
        style={{ height: "170vw" }}
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
