import { useState } from "react";
import {
  Xcel,
  Copy,
  Trash,
  Circle,
  Rename,
  Gallery,
  Starred,
  Download,
  NoPerson,
  ShortRich,
  ShortXcel,
  ThreeDots,
} from "../assets/Icons";
import { FileViewer } from "../Hooks/FileViewer";
import Popup from "reactjs-popup";
import { useAuth } from "../AuthContext";

function FileGallery() {
  const { isGridMode } = useAuth();
  const [isSelected, setIsSelected] = useState(false);
  const [radioClick, setRadioClick] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const data = [
    {
      fileName: "Design &Campign",
      extension: "doc",
      personName: "",
      size: "3.0 GB",
      time: "1h ago",
    },
    {
      fileName: "Sheets",
      extension: "xls",
      personName: "Roanldo Richards",
      size: "3.0 GB",
      time: "1h ago",
    },
    {
      fileName: "Roanldo",
      extension: "xls",
      personName: "Roanldo",
      size: "3.0 GB",
      time: "1h ago",
    },
    {
      fileName: "Butterfly",
      extension: "png",
      personName: "Richards",
      size: "3.0 GB",
      time: "1h ago",
    },
    {
      fileName: "Workspace",
      extension: "doc",
      personName: "Richards",
      size: "3.0 GB",
      time: "1h ago",
    },
    {
      fileName: "Butterfly",
      extension: "png",
      personName: "",
      size: "3.0 GB",
      time: "1h ago",
    },
  ];
  const actions = [
    { icon: <Copy />, label: "Copy" },
    {
      icon: <NoPerson className="w-4 h-4" />,
      label: "Share",
    },
    { icon: <Download />, label: "Download" },
    { icon: <Rename />, label: "Rename" },
    {
      icon: <Starred className="w-4 h-4" />,
      label: "Starred",
    },
    {
      icon: <Trash className="w-4 h-4" />,
      label: "Move to Trash",
    },
  ];
  return (
    <div className="h-full w-[100%] md:w-[96%]">
      {isGridMode ? (
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-2 md:my-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col "
            >
              <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                {item.extension === "xls" && (
                  <Xcel
                    className={"w-[32px] h-[41px] md:w-[61px] md:h-[77px]"}
                  />
                )}
                {item.extension === "doc" && (
                  <img
                    src="/rich.png"
                    className={"w-[40px] h-[40px] md:w-[77px] md:h-[77px]"}
                  />
                )}
                {item.extension === "png" && (
                  <img
                    src="/pic.png"
                    className={"w-[52px] h-[47px] md:w-[99px] md:h-[90px]"}
                  />
                )}
              </div>
              <div className="flex items-center justify-between mt-1 px-2">
                <div className="flex items-center gap-2">
                  {item.extension === "xls" && <ShortXcel />}
                  {item.extension === "doc" && <ShortRich />}
                  {item.extension === "png" && (
                    <Gallery className={"w-3 h-3 md:w-4 md:h-4"} />
                  )}
                  <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                    <span>{item.fileName}</span>
                    <span className="text-[#00000069]">
                      {item.extension} . {item.time}
                    </span>
                  </p>
                </div>
                <span>
                  <ThreeDots />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container md:rounded-xl  md:border w-full h-full my-4">
          <div className="h-full rounded-xl bg-[#F1F5FA] w-[full] hidden md:flex flex-col ">
            <div className="overflow-hidden rounded-xl  bg-[#F1F5FA] w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
              <p className="border w-[30%] gap-2 h-full flex items-center justify-start px-4">
                <span
                  onClick={() => setRadioClick((prev) => !prev)}
                  className="w-auto text-start mr-4 cursor-pointer"
                >
                  <Circle color={radioClick ? "#2676ff" : "none"} />
                </span>{" "}
                Name
              </p>
              <p className="border w-[30%] h-full flex items-center justify-start px-4">
                Shared by
              </p>
              <p className="border w-[30%] h-full flex items-center justify-start px-4">
                File Size
              </p>
              <p className="border w-[10%] h-full flex items-center justify-start px-4">
                More
              </p>
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden   bg-white w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center"
                onClick={handleClick}
              >
                <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                  <span
                    onClick={() => setRadioClick((prev) => !prev)}
                    className="w-auto text-start mr-4 cursor-pointer"
                  >
                    <Circle color={radioClick ? "#2676ff" : "none"} />
                  </span>
                  {item.extension === "xls" && <Xcel className={"w-4 h-4"} />}
                  {item.extension === "doc" && (
                    <img src="rich.png" alt="" className={"w-4 h-4"} />
                  )}
                  {item.extension === "png" && (
                    <Gallery className={"w-3 h-3 md:w-4 md:h-4"} />
                  )}
                  {item.fileName}.{item.extension}
                  {isSelected && (
                    <FileViewer
                      fileUrl="https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/sample_cv.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250110%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250110T124857Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2e2d2395c212d7a8d85df881568f4aa8efbea4bd885dfbef68432c40904a8376"
                      fileType={"pdf"}
                      fileName={"sample"}
                    />
                  )}
                </p>
                <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                  {item.personName === "" ? (
                    <>
                      <NoPerson /> _
                    </>
                  ) : (
                    <>
                      <img src="per1.png" alt="" /> {item.personName}
                    </>
                  )}
                </p>
                <p className="border w-[30%] h-full flex items-center justify-start px-4">
                  {item.size}
                </p>

                <Popup
                  trigger={
                    <p className="cursor-pointer border w-[10%] h-full flex items-center justify-start px-4">
                      <ThreeDots />
                    </p>
                  }
                  position="bottom right"
                  arrowStyle={{
                    color: "white",
                    transform: "translateX(20px)",
                  }}
                  contentStyle={{
                    marginLeft: "-50px",
                    marginTop: "-10px",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    borderColor: "white",
                    border: "none",
                    width: "auto",
                    height: "auto",
                    boxShadow: "0px -2px 12px 0px #0000001A",
                  }}
                  // arrowClassName="popup-arrow"
                  className="popup-content"
                >
                  <div className=" flex flex-col gap-2 p-2 pr-4 font-sans text-[14px]">
                    {actions.map((action, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 items-center text-black whitespace-nowrap`}
                      >
                        {action.icon}
                        {action.label}
                      </div>
                    ))}
                  </div>
                </Popup>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileGallery;
