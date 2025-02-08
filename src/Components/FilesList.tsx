import { useEffect, useState } from "react";
import { Add, Box, List, Xcel, Recent, Filter, Starred } from "../assets/Icons";
import { useAuth } from "../AuthContext";
import FileGallery from "./FileGallery";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { getFiles } from "../features/directories/folderSlice";

function FilesList() {
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);
  const {
    isGridMode,
    setIsGridMode,
    toggleComponent,
    parentFolder,
    setFiles,
    activeFolder,
    files,
  } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (activeFolder === "allFiles") {
      dispatch(getFiles())
        .unwrap()
        .then((res) => {
          setFiles(res);
        });
    }
  }, [parentFolder]);

  const newDocuments = [
    {
      id: "newExcel",
      icon: <Xcel className="w-[32px] h-[41px] md:w-[61px] md:h-[77px]" />,
      label: "Sheets",
    },
    {
      id: "newDocs",
      icon: (
        <img
          src="/rich.png"
          alt="Rich Text Icon"
          className="w-[41px] h-[41px] md:w-[77px] md:h-[77px]"
        />
      ),
      label: "Rich Text",
    },
    {
      id: "newFolder",
      icon: (
        <img
          src="/folders.png"
          alt="Folder Icon"
          className="w-[44px] h-[41px] md:w-[83px] md:h-[77px]"
        />
      ),
      label: "Folder",
    },
  ];

  return (
    <div className="flex flex-col items-center h-full w-[96%]">
      <div className="flex flex-col items-center gap-4 w-[96%]">
        <div className="flex flex-row items-center justify-between gap-4 w-[96%]">
          <p className="text-[16px] md:text-[22px] text-start w-[96%] my-2">
            Create New Document
          </p>
          <button
            onClick={() => toggleComponent("upload")}
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
            }}
            className="w-[79px] h-[31px] md:w-[108px] md:h-[42px] rounded-lg flex gap-1 items-center justify-center  text-white font-sans text-[10px] md:text-[14px]"
          >
            <Add
              className={"w-4 h-4 md:w-5 md:h-5 mb-1 md:mb-0"}
              color={"white"}
            />{" "}
            Upload
          </button>
        </div>
        <div className="flex gap-4 items-start  justify-start w-[96%]">
          {newDocuments.map((Document) => (
            <div
              key={Document.id}
              onClick={() => toggleComponent(Document.id)}
              style={{
                borderImageSource:
                  "linear-gradient(180deg, #B325FC 0%, #8C44FD 45%, #6860FE 100%)",
              }}
              className="w-[109px] h-[124px] md:w-[203px] md:h-[231px] rounded-[16px] md:rounded-[32px] bg-[white] hover:drop-shadow-lg hover:border-none overflow-hidden border flex flex-col items-center justify-between"
            >
              <span className="h-[75%] w-full flex justify-center items-center">
                {Document.icon}
              </span>
              <p className="h-[25%] text-[12px] md:text-[20px] font-sans w-full flex justify-center items-center object-cover overflow-hidden bg-[#F1F5FA]">
                {Document.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      {files && files.count > 0 ? (
        <div className="flex flex-col items-center gap-4 mt-8 w-[96%]">
          <p className="text-[16px] md:text-[22px] text-start w-[96%]">
            All Files
          </p>
          <div className="flex gap-2 justify-between items-center w-[96%]">
            <div className="flex gap-2 items-start">
              <button className="flex items-center justify-start  pl-2 md:pl-3 gap-1 md:gap-2  w-[69px] h-[27px] md:w-[107px] md:h-[42px] text-[10px] md:text-[12px] bg-white rounded-lg md:rounded-xl font-sans border border-[#BFBFBF57]">
                <Recent /> Recent
              </button>
              <button
                onClick={() => setShowStarredOnly((prev) => !prev)}
                className="flex items-center justify-start pl-2 md:pl-3 gap-1 md:gap-2 w-[69px] h-[27px] md:w-[107px] md:h-[42px] text-[10px] md:text-[12px] bg-white rounded-lg md:rounded-xl  font-sans border border-[#BFBFBF57]"
              >
                <Starred
                  className={
                    showStarredOnly
                      ? " text-2xl fill-yellow-300"
                      : "text-black text-2xl"
                  }
                />
                {/* <CiStar /> */}
                Starred
              </button>
            </div>
            <div className="flex gap-4 items-center">
              {isGridMode ? (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setIsGridMode(false);
                  }}
                >
                  <Box />{" "}
                </span>
              ) : (
                <span
                  className="cursor-pointer z-10 flex"
                  onClick={() => {
                    setIsGridMode(true);
                  }}
                >
                  <List />
                </span>
              )}
              <button className="flex items-center justify-start pl-2 md:pl-3 gap-1 md:gap-2 w-[69px] h-[27px] md:w-[107px] md:h-[42px] text-[10px] md:text-[12px] bg-white rounded-lg md:rounded-xl font-sans border border-[#BFBFBF57]">
                <Filter /> Filter
              </button>
            </div>
          </div>
          <FileGallery showStarredOnly={showStarredOnly} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FilesList;
