import { useState } from "react";
import {
  Xcel,
  Copy,
  Trash,
  Circle,
  Rename,
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
  const { isGridMode, parentFolder } = useAuth();
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [radioClick, setRadioClick] = useState(false);
  const handleClick = (index: number) => {
    setIsSelected(index);
  };
  // const data = [
  //   {
  //     url: "https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/testfile.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250113%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250113T151436Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=b140bdf773453729f4e224cc0275d1fc7e5c40e70d02ff9c9ac8f052f80fb9f0",
  //     fileName: "Excel sheet",
  //     extension: "xls",
  //     fileType: "excel",
  //     personName: "",
  //     size: "3.0 GB",
  //     time: "1h ago",
  //   },
  //   {
  //     url: "https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/sample_cv.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250110%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250110T124857Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2e2d2395c212d7a8d85df881568f4aa8efbea4bd885dfbef68432c40904a8376",
  //     fileName: "Resume",
  //     fileType: "pdf",
  //     extension: "pdf",
  //     personName: "Richard",
  //     size: "3.0 GB",
  //     time: "1h ago",
  //   },
  //   {
  //     url: "https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/Terms-Conditions.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250111%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250111T093053Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=0e10715451eec58d550707f73e4d6bac1ccd2fc9cb9a3bccdafa7df46cdb4a45",
  //     fileName: "NeuroDocs",
  //     fileType: "word",
  //     extension: "doc",
  //     personName: "Roanldo",
  //     size: "3.0 GB",
  //     time: "1h ago",
  //   },
  //   // {
  //   //   fileName: "Butterfly",
  //   //   extension: "png",
  //   //   personName: "Richard",
  //   //   size: "3.0 GB",
  //   //   time: "1h ago",
  //   // },
  //   // {
  //   //   fileName: "Workspace",
  //   //   extension: "doc",
  //   //   personName: "Richard",
  //   //   size: "3.0 GB",
  //   //   time: "1h ago",
  //   // },
  //   // {
  //   //   fileName: "Butterfly",
  //   //   extension: "png",
  //   //   personName: "",
  //   //   size: "3.0 GB",
  //   //   time: "1h ago",
  //   // },
  // ];
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
          {parentFolder?.files?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-[109px] cursor-pointer h-[117px] md:w-[207px] md:h-[213px] flex flex-col "
            >
              <div className="flex items-center justify-center h-[80%]  hover:bg-[#f2f3f3] bg-white rounded-[16px] md:rounded-[32px]">
                {item?.name.split(".").pop() === "jpg" && (
                  <>
                    <Gallery className="w-28 h-72" />
                  </>
                )}
                {item?.name.split(".").pop() === "text" && (
                  <img
                    src="/rich.png"
                    className={"w-[40px] h-[40px] md:w-[77px] md:h-[77px]"}
                  />
                )}
                {item?.name.split(".").pop() === "pdf" && (
                  <img
                    src="/pdf.png"
                    className={"w-[32px] h-[41px] md:w-[77px] md:h-[79px]"}
                  />
                )}
              </div>
              <div className="flex items-center justify-between mt-1 px-2">
                <div className="flex items-center gap-2">
                  {item?.name.split(".").pop() === "xls" && <ShortXcel />}
                  {item?.name.split(".").pop() === "doc" && <ShortRich />}
                  {item?.name.split(".").pop() === "jpg" && <Gallery />}
                  {item?.name.split(".").pop() === "pdf" && (
                    <img
                      src="/square.png"
                      className={"w-3 h-3 md:w-[18px] md:h-5"}
                    />
                  )}
                  <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-[#00000069]">
                      {item?.name.split(".").pop()} .{" "}
                      {Math.ceil(item.size / 1000)} MB
                    </span>
                  </p>
                </div>
                <span>
                  <ThreeDots />
                </span>
                {isSelected === index && (
                  <FileViewer
                    fileUrl={item.url}
                    fileType={item.fileType as "excel" | "word" | "pdf"}
                    fileName={item.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container md:rounded-xl  md:border w-full h-full my-4">
          <div className="h-full rounded-xl bg-[#F1F5FA]  w-[full] hidden md:flex flex-col ">
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

            {parentFolder?.files.map((file, index) => (
              <div
                key={index}
                className="overflow-hidden cursor-pointer bg-white hover:bg-[#f2f3f3] w-[full] text-[14px] h-[57px] font-sans flex justify-between items-center"
                onClick={() => handleClick(index)}
              >
                <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                  <span
                    onClick={() => setRadioClick((prev) => !prev)}
                    className="w-auto text-start mr-4 cursor-pointer"
                  >
                    <Circle color={radioClick ? "#2676ff" : "none"} />
                  </span>

                  {file?.name.split(".").pop() === "xls" && (
                    <>
                      {" "}
                      <Xcel className="w-4 h-4" />
                      <span className="ml-2">{file.name}</span>
                    </>
                  )}
                  {file?.name.split(".").pop() === "txt" && (
                    <>
                      {" "}
                      <img src="rich.png" alt="" className="w-4 h-4" />{" "}
                      <span className="ml-2">{file.name}</span>
                    </>
                  )}
                  {file?.name.split(".").pop() === "jpg" && (
                    <>
                      {" "}
                      <Gallery />
                      <span className="ml-2">{file.name}</span>
                    </>
                  )}
                  {file?.name.split(".").pop() === "pdf" && (
                    <>
                      <img src="/pdf.png" className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="ml-2">{file.name}</span>
                    </>
                  )}
                  {/* You can handle other file extensions similarly */}
                </p>

                <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                  {file.personName === "" ? (
                    <>
                      <NoPerson /> _
                    </>
                  ) : (
                    <>
                      <img src="per1.png" alt="" /> {file.personName}
                    </>
                  )}
                </p>

                <p className="border w-[30%] h-full flex items-center justify-start px-4">
                  {file.size}
                </p>

                {/* Show file viewer if selected */}
                {isSelected === index && (
                  <FileViewer
                    fileUrl={file.url}
                    fileType={file.fileType as "excel" | "word" | "pdf"}
                    fileName={file.fileName}
                  />
                )}

                {/* Popup for actions */}
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
                  className="popup-content"
                >
                  <div className="flex flex-col gap-2 p-2 pr-4 font-sans text-[14px]">
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
