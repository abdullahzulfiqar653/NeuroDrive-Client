import { useRef, useState } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
} from "@syncfusion/ej2-react-documenteditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

DocumentEditorContainerComponent.Inject(Toolbar);

const Word = ({ fileUrl , fileName }: any) => {
  const [savedData, setSavedData] = useState(null);
  const containerRef = useRef<DocumentEditorContainerComponent>(null);
  const navigate = useNavigate();

  function save() {
    let http = new XMLHttpRequest();
    http.open("POST", "http://localhost:5000/api");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.responseType = "json";

    const sfdt = { content: containerRef.current?.documentEditor.serialize() };

    console.log("Sending JSON data to backend:", JSON.stringify(sfdt));

    http.onload = function () {
      if (this.status === 200) {
        setSavedData(this.response);
        navigate("/")
        toast.success("Document saved successfully!");
      } else {
        toast.error("Error saving document!");
      }
    };

    http.send(JSON.stringify(sfdt));
  }

  const onToolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === "save") {
      save();
    }
  };

  function onCreate() {
    setInterval(() => {
      updateDocumentEditorSize();
    }, 100);
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    updateDocumentEditorSize();
  }

  function updateDocumentEditorSize() {
    if (containerRef.current && containerRef.current.documentEditor) {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      containerRef.current.documentEditor.resize(windowWidth, windowHeight);
    } else {
      console.log("Document editor not initialized yet.");
    }
  }

  let toolItem: CustomToolbarItemModel = {
    prefixIcon: "e-save icon",
    tooltipText: "Save the Document",
    text: "Save",
    id: "save",
  };

  let items: (string | CustomToolbarItemModel)[] = [
    "New",
    "Open",
    toolItem,
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

  function loadWord(): void {
    fetch(
      fileUrl,
      {
        method: 'Post',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ documentName: fileName })
      }
    )
      .then(response => {
        if (response.status === 200 || response.status === 304) {
          return response.json();
        } else {
          throw new Error('Error loading data');
        }
      })
      .then(json => {
        container.documentEditor.open(JSON.stringify(json));
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <DocumentEditorContainerComponent
      created={onCreate}
      ref={containerRef}
      id="container"
      serviceUrl="http://localhost:62870/api/documenteditor/"
      style={{ height: "590px" }}
      toolbarItems={items}
      toolbarClick={onToolbarClick}
      enableToolbar={true}
      open={loadWord}
    />
  );
};

export default Word;