import { useState } from "react";
import "reactjs-popup/dist/index.css";
import {
  Xcel,
  Trash,
  Circle,
  Rename,
  Starred,
  Download,
  NoPerson,
  ShortRich,
  ShortXcel,
  ThreeDots,
  CleanMeta,
  Gallery,
} from "../assets/Icons";
import { FileViewer } from "../Hooks/FileViewer";
import Popup from "reactjs-popup";
import { useAuth } from "../AuthContext";
import useApi from "../Hooks/usiApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";
import { fetchData, postData } from "../features/ApiSlice";
import { getDirectory } from "../features/directories/folderSlice";
import ReNameFile from "./ReNameFile";
import MetaData from "./MetaData";

function FileGallery({ showStarredOnly }: any) {
  const { isGridMode, parentFolder } = useAuth();
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [metaToggle, setMetaToggle] = useState<boolean>(false);
  const [toggleReName, settoggleReName] = useState(false);
  const [radioClick, setRadioClick] = useState(false);
  const { reset } = useApi("getSingleFile");
  const { post } = useApi("starFile");
  const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
  const [fileData, setFileData] = useState<{
    fileUrl: string;
    fileType: "excel" | "word" | "pdf" | "unknown";
    fileName: string;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024 ** 2) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 ** 3) {
      return `${(sizeInBytes / 1024 ** 2).toFixed(2)} MB`;
    } else {
      return `${(sizeInBytes / 1024 ** 3).toFixed(2)} GB`;
    }
  };

  const handleClick = (index: number) => {
    setIsSelected((prev) => (prev === index ? null : index));
  };

  const handleFileOpen = async (id: number) => {
    try {
      const result = await dispatch(
        fetchData({ url: `files/${id}/`, key: "fileFetch" })
      ).unwrap();
      localStorage.setItem("fileId", result.data.id);
      if (result && result.data) {
        const { content_type, url, name } = result.data;

        const allowedExtensions = ["png", "jpg", "jpeg"];
        const fileExtension = content_type?.split("/")?.pop()?.toLowerCase();

        if (!fileExtension) {
          alert("Invalid file type. Unable to process.");
          return;
        }

        if (allowedExtensions.includes(fileExtension)) {
          const link = document.createElement("a");
          link.href = url;
          link.download = name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("Image Downloaded Successfully");
        } else {
          console.log("jhuhu", result.data.id);

          setFileData({
            fileUrl: url,
            fileType: mapContentTypeToFileType(content_type),
            fileName: name,
          });
        }
      }
    } catch (error) {
      toast.error("Failed to open the file. Please try again.");
    } finally {
      reset();
    }
  };

  const handleStarClick = (name: string, id: number) => {
    try {
      const paylod = {
        name: name,
        is_starred: true,
      };
      post({
        url: `/files/${id}/`,
        payload: paylod,
        method: "put",
      });
      toast.success("File is getting stared");
      dispatch(getDirectory(parentFolderId));
    } catch (error) {
      toast.warning("Error is getting stared");
    }
  };
  const handleUnStarClick = (name: string, id: number) => {
    try {
      const paylod = {
        name: name,
        is_starred: false,
      };
      post({
        url: `/files/${id}/`,
        payload: paylod,
        method: "put",
      });
      toast.success("File is getting unstared");
      dispatch(getDirectory(parentFolderId));
    } catch (error) {
      toast.warning("Error is getting unstared");
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await dispatch(
        postData({
          url: `/files/${id}/`,
          payload: "",
          method: "delete",
          key: "deleteFile",
        })
      ).unwrap();
      if (response?.status === 204) {
        toast.success("Successsfully uploaded profile");
        dispatch(getDirectory(parentFolderId));
      } else {
        toast.error("Failed to uploaded profile");
      }
    } catch (error) {}
    console.log("Prfile upload error");
  };

  const handleDownloadClick = async (id: number) => {
    try {
      const result = await dispatch(
        fetchData({ url: `files/${id}/`, key: "fileFetch" })
      ).unwrap();

      if (result && result.data) {
        const { url, name } = result.data;

        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("file Downloaded Successfully");
      }
    } catch (error) {
      toast.error("Failed to open the file. Please try again.");
    } finally {
      reset();
    }
  };

  const handleMetaData = (meta: any) => {
    if (
      meta === null ||
      (typeof meta === "object" && Object.keys(meta).length === 0)
    ) {
      toast.warn("Meta data is already removed");
    } else {
      setMetaToggle(true);
    }
  };

  return (
    <div className="h-full w-[100%] md:w-[96%]">
      {isGridMode ? (
        <div className="flex flex-wrap justify-center gap-4 md:gap-4 my-2 md:my-4">
          {parentFolder?.files
            ?.filter((item) => (showStarredOnly ? item?.is_starred : true))
            .map((item, index) => (
              <div
                key={index}
                // onClick={() => handleClick(index)}
                onClick={() => handleFileOpen(item.id)}
                className="w-[109px] cursor-pointer h-[117px] md:w-[207px] md:h-[213px] flex flex-col "
              >
                <div className="flex items-center justify-center h-[80%]  hover:bg-[#f2f3f3] bg-white rounded-[16px] md:rounded-[32px]">
                  {["jpg", "png"].includes(item?.name.split(".").pop() || "") ||
                  (item?.content_type &&
                    item.content_type.includes("image/")) ? (
                    <>
                      <Gallery
                        className={"w-[32px] h-[41px] md:w-[77px] md:h-[79px]"}
                      />
                    </>
                  ) : null}
                  {["xls", "xlsx"].includes(
                    item?.name.split(".").pop() || ""
                  ) ||
                  (item?.content_type &&
                    item.content_type.includes("application/vnd.ms-excel")) ||
                  item.content_type.includes(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ) ? (
                    <>
                      <Xcel
                        className={"w-[32px] h-[41px] md:w-[77px] md:h-[79px]"}
                      />
                    </>
                  ) : null}

                  {item?.name.split(".").pop() === "txt" ||
                  (item?.content_type &&
                    item.content_type.includes("text/plain")) ? (
                    <img
                      src="/doc.svg"
                      className={"w-[40px] h-[40px] md:w-[77px] md:h-[77px]"}
                    />
                  ) : null}

                  {item?.name.split(".").pop() === "pdf" ||
                  (item?.content_type &&
                    item.content_type.includes("application/pdf")) ? (
                    <img
                      src="/pdf.png"
                      className={"w-[32px] h-[41px] md:w-[77px] md:h-[79px]"}
                    />
                  ) : null}

                  {["doc", "docx"].includes(
                    item?.name.split(".").pop() || ""
                  ) ||
                  (item?.content_type &&
                    (item.content_type.includes("application/msword") ||
                      item.content_type.includes(
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      ))) ? (
                    <img
                      src="/rich.png"
                      className={"w-[40px] h-[40px] md:w-[77px] md:h-[77px]"}
                    />
                  ) : null}
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
                      <span className="whitespace-nowrap">
                        {item?.name.length > 12
                          ? `${item.name.slice(0, 12)}...${item.name
                              .split(".")
                              .pop()}`
                          : item.name}
                      </span>
                      <span className="text-[#00000069]">
                        {item?.name.split(".").pop()} .{" "}
                        {formatFileSize(item?.size)}
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

            {parentFolder?.files
              .filter((item) => (showStarredOnly ? item?.is_starred : true))
              .map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleFileOpen(file.id)}
                  className="overflow-hidden cursor-pointer bg-white hover:bg-[#f2f3f3] w-[full] text-[14px] h-[57px] font-sans flex justify-between items-center"
                >
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(index);
                      }}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle
                        color={isSelected === index ? "#2676ff" : "none"}
                      />
                    </span>

                    {/* Check file extension and content type */}
                    {["xls", "xlsx"].includes(
                      file?.name.split(".").pop() || ""
                    ) ||
                    (file?.content_type &&
                      (file.content_type.includes("excel") ||
                        file.content_type.includes("spreadsheet"))) ? (
                      <>
                        <Xcel className="w-4 h-4" />
                        <p className="whitespace-nowrap">
                          {file?.name.length > 10
                            ? file.name.includes(".")
                              ? `${file.name.slice(0, 10)}...${file.name
                                  .split(".")
                                  .pop()}`
                              : `${file.name.slice(0, 10)}...`
                            : file.name}
                        </p>
                      </>
                    ) : null}

                    {["doc", "docx"].includes(
                      file?.name.split(".").pop() || ""
                    ) ||
                    (file?.content_type &&
                      (file.content_type.includes("application/msword") ||
                        file.content_type.includes(
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ))) ? (
                      <>
                        <ShortRich />
                        <p className="whitespace-nowrap">
                          {file?.name.length > 10
                            ? file.name.includes(".")
                              ? `${file.name.slice(0, 10)}...${file.name
                                  .split(".")
                                  .pop()}`
                              : `${file.name.slice(0, 10)}...`
                            : file.name}
                        </p>
                      </>
                    ) : null}

                    {file?.name.split(".").pop() === "txt" ||
                    (file?.content_type &&
                      file.content_type.includes("text/plain")) ? (
                      <>
                        <img src="rich.png" alt="" className="w-4 h-4" />
                        <p className="whitespace-nowrap">
                          {file?.name.length > 10
                            ? file.name.includes(".")
                              ? `${file.name.slice(0, 10)}...${file.name
                                  .split(".")
                                  .pop()}`
                              : `${file.name.slice(0, 10)}...`
                            : file.name}
                        </p>
                      </>
                    ) : null}

                    {["jpg", "png"].includes(
                      file?.name.split(".").pop() || ""
                    ) ||
                    (file?.content_type &&
                      (file.content_type.includes("image/jpeg") ||
                        file.content_type.includes("image/png"))) ? (
                      <>
                        <div>
                          <Gallery className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <p className="whitespace-nowrap">
                          {file?.name.length > 10
                            ? file.name.includes(".")
                              ? `${file.name.slice(0, 10)}...${file.name
                                  .split(".")
                                  .pop()}`
                              : `${file.name.slice(0, 10)}...`
                            : file.name}
                        </p>
                      </>
                    ) : null}

                    {file?.name.split(".").pop() === "pdf" && (
                      <>
                        <img src="/pdf.png" className="w-3 h-3 md:w-4 md:h-4" />
                        <p className="whitespace-nowrap">
                          {file?.name.length > 10
                            ? file.name.includes(".")
                              ? `${file.name.slice(0, 10)}...${file.name
                                  .split(".")
                                  .pop()}`
                              : `${file.name.slice(0, 10)}...`
                            : file.name}
                        </p>
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
                    {formatFileSize(file?.size)}
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
                      <div className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer">
                        <NoPerson className="w-4 h-4" />
                        Share
                      </div>
                      {file?.is_starred ? (
                        <div
                          onClick={() =>
                            handleUnStarClick(file?.name, file?.id)
                          }
                          className="flex gap-2 items-center whitespace-nowrap cursor-pointer"
                        >
                          <Starred className="w-4 h-4 fill-yellow-300" />
                          Unstarred
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStarClick(file?.name, file?.id)}
                          className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
                        >
                          <Starred className="w-4 h-4" />
                          Starred
                        </div>
                      )}
                      <div
                        onClick={() => settoggleReName(true)}
                        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
                      >
                        <Rename />
                        Rename
                      </div>
                      {toggleReName && (
                        <ReNameFile
                          fileId={file?.id}
                          settoggleReName={settoggleReName}
                        />
                      )}
                      <div
                        onClick={() => handleDownloadClick(file?.id)}
                        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
                      >
                        <Download />
                        Download
                      </div>
                      <div
                        onClick={() => handleMetaData(file?.metadata)}
                        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
                      >
                        <CleanMeta />
                        Clean meta data
                      </div>
                      {metaToggle && (
                        <MetaData
                          meta={file?.metadata}
                          name={file?.name}
                          setMetaToggle={setMetaToggle}
                          id={file?.id}
                        />
                      )}
                      <div
                        onClick={() => handleDeleteClick(file?.id)}
                        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                        Move to Trash
                      </div>
                    </div>
                  </Popup>
                </div>
              ))}
          </div>
          {parentFolder?.files
            .filter((item) => (showStarredOnly ? item.is_starred : true))
            .map((file) => (
              <div
                onClick={() => handleFileOpen(file.id)}
                className="w-full h-[74px] my-2  rounded-tl-[12px] rounded-tr-[12px] bg-[#FFFFFF] md:hidden flex flex-col items-center"
              >
                <div className="h-[50%] w-full bg-[#F1F5FA] rounded-tl-[12px] rounded-tr-[12px] px-2 pr-4 flex justify-between items-center">
                  <p className="flex items-center font-sans text-[11px]">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    {["xls", "xlsx"].includes(
                      file?.name.split(".").pop() || ""
                    ) && (
                      <>
                        <Xcel className="w-4 h-5 mr-1" />
                        <p className="whitespace-nowrap ml-1">
                          {file?.name.length > 10
                            ? `${file.name.slice(0, 10)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </p>
                      </>
                    )}
                    {["doc", "docx"].includes(
                      file?.name.split(".").pop() || ""
                    ) && (
                      <>
                        <ShortRich />
                        <p className="whitespace-nowrap ml-1">
                          {file?.name.length > 10
                            ? `${file.name.slice(0, 10)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </p>
                      </>
                    )}
                    {file?.name.split(".").pop() === "txt" && (
                      <>
                        {" "}
                        <img src="rich.png" alt="" className="w-4 h-4" />{" "}
                        <p className="whitespace-nowrap ml-1">
                          {file?.name.length > 10
                            ? `${file.name.slice(0, 10)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </p>
                      </>
                    )}
                    {["jpg", "png"].includes(
                      file?.name.split(".").pop() || ""
                    ) && (
                      <>
                        <div>
                          <Gallery className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <p className="whitespace-nowrap ml-1">
                          {file?.name.length > 10
                            ? `${file.name.slice(0, 10)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </p>
                      </>
                    )}
                    {file?.name.split(".").pop() === "pdf" && (
                      <>
                        <img src="/pdf.png" className="w-4 h-4 mr-1" />
                        <p className="whitespace-nowrap ml-1">
                          {file?.name.length > 10
                            ? `${file.name.slice(0, 10)}...${file.name
                                .split(".")
                                .pop()}`
                            : file.name}
                        </p>
                      </>
                    )}
                  </p>
                  <ThreeDots />
                </div>
                <div className="h-[50%] w-[85%] flex justify-between items-center">
                  <p className="border-b w-[50%] h-full flex gap-2 items-center justify-start px-4">
                    <NoPerson className={"w-[20px] h-[20px]"} /> _
                  </p>
                  <p className=" w-[50%] text-[10px] font-sans h-full flex items-center justify-end px-4">
                    File size: {(file.size / 1024 ** 2).toFixed(2)} GB
                  </p>
                </div>
              </div>
            ))}
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
