import { useState } from "react";
import { Cross, Xcel } from "../assets/Icons";
import { useAuth } from "../AuthContext";
import { FileViewer } from "../Hooks/FileViewer";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createFolders, getDirectory } from "../features/directories/folderSlice";
import { ThreeDots } from "react-loader-spinner";

function CreateComponent() {
  const [createFile, setCreateFile] = useState(false);
  const { parentFolder, isOpenComponent, toggleComponent } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    name: "",
    parent: "",
  });
  const [fileData, setFileData] = useState<{
    fileUrl: string;
    fileType: "excel" | "word" | "pdf";
    fileName: string;
  } | null>(null);

  const handleClose = () => {
    if (isOpenComponent.newExcel) {
      toggleComponent("newExcel", false);
    } else if (isOpenComponent.newDocs) {
      toggleComponent("newDocs", false);
    } else if (isOpenComponent.newFolder) {
      toggleComponent("newFolder", false);
    }
  };

  const handleChange = (newValue: string) => {
    setValue((prev) => ({
      ...prev,
      name: newValue,
    }));
  };

  const createBlankFile = (type: "excel" | "word" | "pdf") => {
    const fileName = `${value.name || "New File"}.${type}`;
    let fileUrl = "";

    if (type === "excel") {
      fileUrl = type; // can change url as we want
    } else if (type === "word") {
      fileUrl = type;
    } else if (type === "pdf") {
      fileUrl = type;
    }

    setFileData({ fileUrl, fileType: type, fileName });
    setTimeout(() => {
      toggleComponent("newDocs", false);
      toggleComponent("newFolder", false);
      toggleComponent("newExcel", false);
    }, 100);
  };

  const handleSubmit = () => {
    if (isOpenComponent.newExcel) {
      createBlankFile("excel");
    } else if (isOpenComponent.newDocs) {
      createBlankFile("word");
    } else if (isOpenComponent.newFolder) {
      const updatedValue = {
        ...value,
        parent: parentFolder?.id,
      };
      setLoading(true);
      dispatch(createFolders(updatedValue))
        .unwrap()
        .then(() => {
          const parentFolderId = localStorage.getItem("parent_folder_id");
          if (parentFolderId) {
            dispatch(getDirectory(parentFolderId));
          }
          toast.success("Folder Created Successfully");
          toggleComponent("newFolder", false);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Folder Creation failed:", error);
        });
    }
    setCreateFile(true);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="w-[95vw] h-[60vh] gap-4 relative max-w-[351px] max-h-[366px] md:min-w-[493px] md:min-h-[463px] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
        <span
          onClick={handleClose}
          className="absolute right-[17px] top-[17px] cursor-pointer"
        >
          <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
        </span>
        {isOpenComponent.newFolder && (
          <img
            src="/folders.png"
            alt="Folder Icon"
            className="w-[49px] h-[40px] md:w-[83px] md:h-[77px]"
          />
        )}
        {isOpenComponent.newDocs && <img src="/rich.png" alt="Word Icon" />}
        {isOpenComponent.newExcel && <Xcel />}
        <p className="text-[22px] text-[#202343]">
          Create New {isOpenComponent.newFolder && "Folder"}
          {isOpenComponent.newDocs && "Neurodoc"}
          {isOpenComponent.newExcel && "Sheet"}
        </p>
        <div className="flex flex-col items-start w-full justify-start text-[12px] md:text-[14px] text-[black]">
          <p className="font-sans">Enter Name</p>
          <div className="h-[36px] w-[97%] md:h-[54px] bg-[#ECECEC] rounded-md px-3">
            <input
              value={value.name}
              onChange={(e) => handleChange(e.target.value)}
              type="text"
              placeholder={
                isOpenComponent.newFolder
                  ? "Enter your folder name"
                  : "Enter your file name"
              }
              className={`w-full h-full outline-none text-[12px] font-sans font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-[#000000ac] placeholder:font-[500] placeholder:text-[black]`}
              />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={value.name === ""}
          style={{
            background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
            borderImageSource:
              "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
          }}
          className="w-[132px] h-[34px] disabled:opacity-75 disabled:cursor-not-allowed md:w-[163px] md:h-[42px] rounded-xl text-white font-sans text-[13px] mt-3 md:mt-5 flex justify-center items-center"
        >
          Create
          {loading && (
            <span className="ml-2">
              <ThreeDots height="25" width="25" color="white" />
            </span>
          )}
        </button>

        {createFile && fileData && (
          <FileViewer
            fileUrl={fileData.fileUrl}
            fileType={fileData.fileType}
            fileName={fileData.fileName}
          />
        )}
      </div>
    </div>
  );
}

export default CreateComponent;