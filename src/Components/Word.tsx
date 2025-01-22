import { useEffect, useRef } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
} from "@syncfusion/ej2-react-documenteditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useFileLoader from "../Hooks/useFileLoader";

DocumentEditorContainerComponent.Inject(Toolbar);

const Word = ({ fileUrl, fileName }: any) => {
  // const [savedData, setSavedData] = useState(null);
  const viewerRef = useRef<DocumentEditorContainerComponent>(null);
  const navigate = useNavigate();

  const { loadFile } = useFileLoader({
    fileType: "word",
    fileUrl,
    fileName,
    viewerRef,
  });

  const save = () => {
    if (!viewerRef.current) return;

    const sfdt = { content: viewerRef.current.documentEditor.serialize() };
    console.log("Sending JSON data to backend:", JSON.stringify(sfdt));

    axios
      .post("http://localhost:5000/api", sfdt, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // setSavedData(response.data);
        navigate("/");
        console.log(response, "response");
        toast.success("Document saved successfully!");
      })
      .catch((error) => {
        console.error("Save error:", error);
        toast.error("Error saving document!");
      });
  };

  const onToolbarClick = (args: any): void => {
    if (args.item.id === "save") save();
  };

  useEffect(() => {
    if (fileUrl) {
      loadFile();
    }
  }, [fileUrl]);

  const toolbarItems: (string | CustomToolbarItemModel)[] = [
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
