import { useEffect, useState } from "react";
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
import useApi from "../Hooks/usiApi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toast } from "react-toastify";

function FileGallery({ showStarredOnly }: any) {
  const { isGridMode, parentFolder } = useAuth();
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [radioClick, setRadioClick] = useState(false);
  const { fetch, reset } = useApi("getSingleFile");
  const { post } = useApi("starFile");
  const { post: deletePost } = useApi("deleteFile");
  const [fileData, setFileData] = useState<{
    fileUrl: string;
    fileType: "excel" | "word" | "pdf" | "unknown";
    fileName: string;
  } | null>(null);
  const data = useSelector(
    (state: RootState) => state.api.calls?.getSingleFile
  );
  const starData = useSelector((state: RootState) => state.api.calls?.starFile);
  const deleteRes = useSelector(
    (state: RootState) => state.api.calls?.deleteFile
  );
  const handleClick = (index: number) => {
    setIsSelected((prev) => (prev === index ? null : index));
  };
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
  // console.log(data?.response);

  const handleFileOpen = (id: number) => {
    fetch(`files/${id}/`);
    reset();
  };

  if (data?.response?.data) {
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const fileExtension = data?.response?.data?.content_type
      ?.split("/")
      .pop()
      ?.toLowerCase();
    if (!fileExtension) {
      console.error(
        "Unable to determine the file extension from the response."
      );
      return;
    }
    if (allowedExtensions.includes(fileExtension)) {
      const link = document.createElement("a");
      link.href = data?.response?.data?.url;
      link.download = data?.response?.data?.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log(data?.response?.data?.url);
      setFileData({
        fileUrl: data?.response?.url,
        fileType: mapContentTypeToFileType(data?.response?.data?.content_type),
        fileName: data?.response?.data?.name,
      });
      alert(`This file type (${fileExtension}) is not supported for download.`);
      console.warn("Unsupported file type:", fileExtension);
    }
  }

  const handleStarClick = (name: string, id: number) => {
    console.log(name, id);
    const paylod = {
      name: name,
      is_starred: true,
    };
    post({
      url: `/files/${id}/`,
      payload: paylod,
      method: "put",
    });
  };
  useEffect(() => {
    if (starData?.response?.status === 200) {
      toast.success("File uploaded successfully!");
    }
  }, []);
  const handleDeleteClick = (id: number) => {
    deletePost({
      url: `/files/${id}/`,
      payload: id,
      method: "put",
    });
  };

  // console.log(deleteRes);
  return (
    <div className="h-full w-[100%] md:w-[96%]">
      {isGridMode ? (
        <div className="flex flex-wrap justify-center gap-4 md:gap-4 my-2 md:my-4">
          {parentFolder?.files
            ?.filter((item) => (showStarredOnly ? item.is_starred : true))
            .map((item, index) => (
              <div
                key={index}
                // onClick={() => handleClick(index)}
                onClick={() => handleFileOpen(item.id)}
                className="w-[109px] cursor-pointer h-[117px] md:w-[207px] md:h-[213px] flex flex-col "
              >
                <div className="flex items-center justify-center h-[80%]  hover:bg-[#f2f3f3] bg-white rounded-[16px] md:rounded-[32px]">
                  {item?.name.split(".").pop() === "jpg" && (
                    <>
                      <Gallery className="w-28 h-32" />
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
                  {item?.name.split(".").pop() === "doc" && (
                    <img
                      src="/doc.svg"
                      className={"w-[40px] h-[40px] md:w-[77px] md:h-[77px]"}
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
                        {(item.size / 1024 ** 2).toFixed(2)} GB
                      </span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                  {fileData && (
                    <FileViewer
                      fileUrl={fileData?.fileUrl}
                      fileType={fileData.fileType as "excel" | "word" | "pdf"}
                      fileName={fileData?.fileName}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="container md:rounded-xl md:border w-full h-full my-4">
          <div className="h-full rounded-xl bg-[#F1F5FA]  w-[full] md:flex flex-col ">
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

            {parentFolder?.files
              .filter((item) => (showStarredOnly ? item.is_starred : true))
              .map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleFileOpen(file.id)}
                  // onClick={() => fetch(`files/${file.id}/`)}
                  className="overflow-hidden cursor-pointer bg-white hover:bg-[#f2f3f3] w-[full] text-[14px] h-[57px] font-sans flex justify-between items-center"
                >
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      // onClick={() => setRadioClick((prev) => !prev)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(index);
                      }}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle
                        // onClick={() => handleClick(index)}
                        color={isSelected === index ? "#2676ff" : "none"}
                      />
                    </span>

                    {file?.name.split(".").pop() === "xls" && (
                      <>
                        <Xcel className="w-4 h-4" />
                        <span className="ml-2">
                          {file?.name.length > 12
                            ? `${file.name.slice(0, 12)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </span>
                      </>
                    )}
                    {file?.name.split(".").pop() === "doc" && (
                      <>
                        <ShortRich />
                        <span className="ml-2">
                          {file?.name.length > 12
                            ? `${file.name.slice(0, 12)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </span>
                      </>
                    )}
                    {file?.name.split(".").pop() === "txt" && (
                      <>
                        {" "}
                        <img src="rich.png" alt="" className="w-4 h-4" />{" "}
                        {file?.name.length > 12
                          ? `${file.name.slice(0, 12)}...${file.name
                              .split(".")
                              .pop()}`
                          : file.name}
                      </>
                    )}
                    {file?.name.split(".").pop() === "jpg" && (
                      <>
                        {" "}
                        <Gallery />
                        {file?.name.length > 12
                          ? `${file.name.slice(0, 12)}...${file.name
                              .split(".")
                              .pop()}`
                          : file.name}
                      </>
                    )}
                    {file?.name.split(".").pop() === "pdf" && (
                      <>
                        <img src="/pdf.png" className="w-3 h-3 md:w-4 md:h-4" />
                        {file?.name.length > 12
                          ? `${file.name.slice(0, 12)}...${file.name
                              .split(".")
                              .pop()}`
                          : file.name}
                      </>
                    )}
                  </p>

                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    {Array.isArray(file.shared_with) &&
                    file.shared_with.length > 0 ? (
                      <>
                        <img src="per1.png" alt="Person" /> {file.personName}
                      </>
                    ) : (
                      <>
                        <NoPerson />
                      </>
                    )}
                  </p>

                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    {(file.size / 1024 ** 2).toFixed(2)} GB
                  </p>

                  {fileData && (
                    <FileViewer
                      fileUrl={fileData?.fileUrl}
                      fileType={fileData.fileType as "excel" | "word" | "pdf"}
                      fileName={fileData?.fileName}
                    />
                  )}

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
                    <div className="flex flex-col gap-2 p-2 pr-4 font-sans text-[14px] ">
                      {actions.map((action, index) => (
                        <div
                          key={index}
                          onClick={
                            action.label === "Starred"
                              ? () => handleStarClick(file?.name, file?.id) // Trigger star toggle
                              : action.label === "Delete"
                              ? () => handleDeleteClick(file?.id) // Trigger delete operation
                              : undefined
                          }
                          className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
                        >
                          {/* Conditionally apply class for the star icon */}
                          <div
                            className={`${
                              action.label === "Starred" && file?.starred
                                ? "text-yellow-400"
                                : "text-black"
                            }`}
                          >
                            {action.icon}
                          </div>
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
// function mapContentTypeToFileType(
//   content_type: any
// ): "excel" | "word" | "pdf" | "unknown" {
//   throw new Error("Function not implemented.");
// }
function mapContentTypeToFileType(
  contentType: string
): "excel" | "word" | "pdf" | "unknown" {
  if (contentType.includes("pdf")) {
    return "pdf";
  } else if (
    contentType.includes("msword") ||
    contentType.includes("wordprocessingml")
  ) {
    return "word";
  } else if (
    contentType.includes("excel") ||
    contentType.includes("spreadsheetml")
  ) {
    return "excel";
  } else {
    return "unknown";
  }
}
