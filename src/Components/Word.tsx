import { useEffect, useRef } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
  ToolbarItem,
} from "@syncfusion/ej2-react-documenteditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFileLoader from "../Hooks/useFileLoader";
import { postData } from "../features/ApiSlice";
import { getDirectory } from "../features/directories/folderSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useAuth } from "../AuthContext";

DocumentEditorContainerComponent.Inject(Toolbar);

const Word = ({ fileUrl, fileName }: any) => {
  const viewerRef = useRef<DocumentEditorContainerComponent>(null);
  const navigate = useNavigate();
  const { parentFolder } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const { loadFile } = useFileLoader({
    fileType: "word",
    fileUrl,
    fileName,
    viewerRef,
  });

  if (fileUrl === "") {
    if (viewerRef.current) {
      viewerRef.current.documentEditor.open("");
    }
    return;
  }

  const save = async () => {
    try {
      if (!viewerRef.current) {
        toast.error("Document editor is not initialized.");
        return;
      }

      const docxBlob = await viewerRef.current.documentEditor.saveAsBlob(
        "Docx"
      );
      const parentFolderId = localStorage.getItem("parent_folder_id") || "";
      let fileId = localStorage.getItem("fileId") || "";

      const isExistingFile =
        fileId &&
        Array.isArray(parentFolder?.files) &&
        parentFolder.files.some((file) => file.id === fileId);
      const formData = new FormData();
      formData.append(
        "file",
        docxBlob,
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
      toast.error("Failed to save document.");
    }
  };

  const onToolbarClick = (args: any): void => {
    if (args.item.id === "save") save();
  };

  useEffect(() => {
    if (fileUrl) {
      loadFile();
    }
  }, [fileUrl]);

  const toolbarItems: (ToolbarItem | CustomToolbarItemModel)[] = [
    "New",
    "Open",
    {
      prefixIcon: "e-save icon",
      tooltipText: "Save the Document",
      text: "Save",
      id: "save",
    },
    "Separator",
    "Undo",
    "Redo",
    "Separator",
    "Image",
    "Table",
    "Hyperlink",
    "Bookmark",
    "TableOfContents",
    "Separator",
    "Header",
    "Footer",
    "PageSetup",
    "PageNumber",
    "Break",
    "InsertFootnote",
    "InsertEndnote",
    "Separator",
    "Find",
    "Separator",
    "Comments",
    "TrackChanges",
    "Separator",
    "LocalClipboard",
    "RestrictEditing",
    "Separator",
    "FormFields",
    "UpdateFields",
    "ContentControl",
  ];

  useEffect(() => {
    const handleResize = () => {
      if (viewerRef.current) {
        const editor = viewerRef.current.documentEditor;
        if (editor) {
          editor.resize(window.innerWidth, window.innerHeight);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <DocumentEditorContainerComponent
        created={() => {
          const handleResize = () => {
            if (viewerRef.current) {
              const editor = viewerRef.current.documentEditor;
              editor.resize(window.innerWidth, window.innerHeight);
            }
          };
          handleResize();
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }}
        ref={viewerRef}
        id="container"
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        style={{ height: "590px" }}
        toolbarItems={toolbarItems}
        toolbarClick={onToolbarClick}
        enableToolbar={true}
      />
    </>
  );
};

export default Word;
