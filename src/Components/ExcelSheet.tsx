import React, { useEffect, useRef } from "react";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { toast } from "react-toastify";
import { postData } from "../features/ApiSlice";
import { getDirectory } from "../features/directories/folderSlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFileLoader from "../Hooks/useFileLoader";
import { useAuth } from "../AuthContext";

interface ExcelSheetProps {
  fileUrl: any;
  fileName: any;
}

const ExcelSheet: React.FC<ExcelSheetProps> = ({ fileUrl, fileName }) => {
  const viewerRef = useRef<SpreadsheetComponent>(null);
  const navigate = useNavigate();
  const { parentFolder } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const beforeSave = (args: any) => {
    args.needBlobData = true;
    args.isFullPost = false;
  };

  const { loadFile } = useFileLoader({
    fileType: "excel",
    fileUrl,
    fileName,
    viewerRef,
  });

  const saveComplete = async (args: any) => {
    if (args.blobData) {
      try {
        const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
        const formData = new FormData();

        let blobData = args.blobData;
        if (!(blobData instanceof Blob)) {
          blobData = new Blob([args.blobData], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
        }

        formData.append("saveType", "Xlsx");
        formData.append(
          "file",
          blobData,
          fileName ? `${fileName}` : "Sample.xlsx"
        );

        let fileId = localStorage.getItem("fileId") || "";

        const isExistingFile =
        fileId &&
        Array.isArray(parentFolder?.files) &&
        parentFolder.files.some((file) => file.id === fileId);
        formData.append(
        "file",
        blobData,
        fileName ? `${fileName}` : "Sample.docx"
      );

      let response;
      if (isExistingFile) {
        response = await dispatch(
          postData({
            url: `/files/${fileId}/`,
            payload: formData,
            method: "patch",
            key: "updateFile",
          })
        ).unwrap();
      } else {
        response = await dispatch(
          postData({
            url: `/directories/${parentFolderId}/files/`,
            payload: formData,
            method: "post",
            key: "createFile",
          })
        ).unwrap();
      }
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          isExistingFile
            ? "Document updated successfully!"
            : "Document saved successfully!"
        );
      }
      dispatch(getDirectory(parentFolderId));
      navigate("/");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file");
      }
    } else {
      toast.error("No file data provided");
    }
  };

  // const fetchData = async () => {
  //   if (!fileUrl) return;

  //   try {
  //     const response = await axios.get(fileUrl, { responseType: "blob" });

  //     const textData = await response.data.text();
  //     if (textData.trim().startsWith("<!DOCTYPE html>")) {
  //       console.error("Received an HTML response instead of an Excel file.");
  //       toast.error("Error loading file. Please check the file URL.");
  //       return;
  //     }

  //     const fileBlob = new Blob([response.data], {
  //       type: response.headers["content-type"],
  //     });

  //     if (
  //       !fileBlob.type.includes(
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //       )
  //     ) {
  //       return;
  //     }

  //     const file = new File([fileBlob], fileName || "Sample.xlsx", {
  //       type: fileBlob.type,
  //     });

  //     viewerRef.current?.open({ file });
  //   } catch (error) {
  //     console.error("Error fetching file:", error);
  //     toast.error("Failed to load the file. Please try again.");
  //   }
  // };

  useEffect(() => {
    if (fileUrl) {
      loadFile();
    }
  }, [fileUrl]);

  return (
    <div
      className="control-section spreadsheet-control"
      style={{ height: "90vh" }}
    >
      <SpreadsheetComponent
        openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
        saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
        ref={viewerRef}
        beforeSave={beforeSave}
        saveComplete={saveComplete}
        // created={fetchData}
      />
    </div>
  );
};

export default ExcelSheet;
