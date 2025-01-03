import React, { useRef } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  CustomToolbarItemModel,
} from "@syncfusion/ej2-react-documenteditor";

DocumentEditorContainerComponent.Inject(Toolbar);

const Word = () => {
  let container: DocumentEditorContainerComponent;
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
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    container.resize(windowWidth, windowHeight);
  }
  const containerRef:any = useRef<DocumentEditorContainerComponent>(null);

  const onToolbarClick = (args: ClickEventArgs): void => {
    switch (args.item.id) {
      case "save":
        containerRef.current.documentEditor.save("sample", "Docx");
        break;
      default:
        break;
    }
  };

  let toolItem: CustomToolbarItemModel = {
    prefixIcon: "e-save icon",
    tooltipText: "Save the Document",
    text: "Save",
    id: "save",
  };

  let items = [
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

  return (
    <DocumentEditorContainerComponent
    created={onCreate}
      ref={containerRef}
      id="container"
      style={{ height: "590px" }}
      toolbarItems={items} 
      toolbarClick={onToolbarClick}
      enableToolbar={true}
    >
    </DocumentEditorContainerComponent>
  );
};

export default Word;