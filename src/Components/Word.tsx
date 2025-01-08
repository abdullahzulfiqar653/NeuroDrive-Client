import { useEffect, useRef, useState } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
} from "@syncfusion/ej2-react-documenteditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

DocumentEditorContainerComponent.Inject(Toolbar);

const Word = ({ fileUrl }: any) => {
  const [savedData, setSavedData] = useState(null);
  const containerRef = useRef<DocumentEditorContainerComponent>(null);
  const navigate = useNavigate();

  const save = () => {
    if (!containerRef.current) return;

    const sfdt = { content: containerRef.current.documentEditor.serialize() };
    console.log("Sending JSON data to backend:", JSON.stringify(sfdt));

    axios.post('http://localhost:5000/api', sfdt, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setSavedData(response.data);
        navigate('/');
        console.log(response , 'response')
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

 
const loadDocxFromURL = async (url: string) => {
  if (!containerRef.current) {
    toast.error("Document Editor is not initialized.");
    return;
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    if (response.status !== 200) throw new Error(`Failed to fetch document: ${response.statusText}`);
    const arrayBuffer = response.data;
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    containerRef.current.documentEditor.open(base64String);
    toast.success("Document loaded successfully!");
    const sfdtContent = containerRef.current.documentEditor.serialize();
    console.log("SFDT Content:", sfdtContent);
    toast.success("Document converted to SFDT!");
  } catch (error) {
    console.error("Error loading document:", error);
    toast.error("Failed to load and convert document.");
  }
};
  useEffect(() => {
    if (fileUrl) {
      loadDocxFromURL(fileUrl);
    }
  }, [fileUrl]);

  const toolbarItems: (string | CustomToolbarItemModel)[] = [
    "New",
    "Open",
    { prefixIcon: "e-save icon", tooltipText: "Save the Document", text: "Save", id: "save" },
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
    const interval = setInterval(() => {
      if (containerRef.current) {
        const editor = containerRef.current.documentEditor;
        if (editor) {
          editor.resize(window.innerWidth, window.innerHeight);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <DocumentEditorContainerComponent
      created={() => {
        setInterval(() => {
          if (containerRef.current) {
            const editor = containerRef.current.documentEditor;
            editor.resize(window.innerWidth, window.innerHeight);
          }
        }, 100);
      }}
      ref={containerRef}
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
