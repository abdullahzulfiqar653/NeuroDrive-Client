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

DocumentEditorContainerComponent.Inject(Toolbar);

const Word = ({ fileUrl, fileName }: any) => {
  // const [savedData, setSavedData] = useState(null);
  const viewerRef = useRef<DocumentEditorContainerComponent>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loadFile } = useFileLoader({
    fileType: "word",
    fileUrl,
    fileName,
    viewerRef,
  });

  const save = async () => {
    if (!viewerRef.current) return;
  
    const sfdt = viewerRef.current.documentEditor.serialize();
    console.log("Serialized SFDT data:", sfdt); // Debug serialized content
  
    try {
      const formData = new FormData();
      const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
  
      const fileBlob = new Blob([sfdt], { type: "application/json" }); 
      formData.append("file", fileBlob, "document2.doc");
  
      // Debug: Log the Blob content before sending
      fileBlob.text().then((content) => {
        console.log("Content of the Blob being sent to the backend:", content);
      });
  
      await dispatch(
        postData({
          url: `/directories/${parentFolderId}/files/`,
          payload: formData,
          method: "post",
          key: "uploadFile",
        })
      ).unwrap();
  
      dispatch(getDirectory(parentFolderId));
      toast.success("File Upload Successful");
      navigate('/')
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
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
  );
};

export default Word;
