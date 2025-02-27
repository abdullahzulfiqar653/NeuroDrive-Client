import { useEffect, useRef, useState } from "react";
import "reactjs-popup/dist/index.css";
import {
  Xcel,
  Circle,
  NoPerson,
  ShortRich,
  ShortXcel,
  ThreeDots,
  Gallery,
} from "../assets/Icons";
import { FileViewer } from "../Hooks/FileViewer";
import { useAuth } from "../AuthContext";
import useApi from "../Hooks/usiApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { GoLock } from "react-icons/go";
import { toast } from "react-toastify";
import { fetchData, postData } from "../features/ApiSlice";
import { getDirectory } from "../features/directories/folderSlice";
import CustomPopup from "./CustomPopup";
import ProtectedPass from "./ProtectedPass";

function FileGallery({ showStarredOnly }: any) {
  const { isGridMode, parentFolder } = useAuth();
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [metaToggle, setMetaToggle] = useState<boolean>(false);
  const [fileExtension, setFileExtension] = useState("");
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [protectedFile, setProtectedFile] = useState<{
    isActive: boolean;
    workType: string;
  }>({
    isActive: false,
    workType: "",
  });
  console.log(parentFolder);
  console.log(protectedFile.workType);

  const handlePopupToggle = ({ index, event }: any) => {
    event.stopPropagation();
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleFileOpen = async (id: number, isProtected: boolean) => {
    localStorage.setItem("fileId", id.toString());
    try {
      if (isProtected) {
        setProtectedFile((prev) => ({
          ...prev,
          isActive: true,
          workType: "downloadOpen",
        }));
        return;
      }
      const result = await dispatch(
        fetchData({ url: `files/${id}/`, key: "fileFetch" })
      ).unwrap();
      if (result && result.data) {
        const { content_type, url, name } = result.data;
        const allowedExtensions = ["png", "jpg", "jpeg"];
        const fileExtension = content_type?.split("/")?.pop()?.toLowerCase();
        setFileExtension(fileExtension);
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
      toast.success("File is getting starred");
      dispatch(getDirectory(parentFolderId));
      setActiveIndex(null);
    } catch (error) {
      toast.warning("Error is getting starred");
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
      toast.success("File is getting unstarred");
      dispatch(getDirectory(parentFolderId));
      setActiveIndex(null);
    } catch (error) {
      toast.warning("Error is getting unstarred");
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
        toast.success("File Deleted Successfully");
        dispatch(getDirectory(parentFolderId));
        setActiveIndex(null);
      }
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  const handleDownloadClick = async (id: number, isProtected: boolean) => {
    try {
      if (isProtected) {
        localStorage.setItem("fileId", id.toString());
        setProtectedFile((prev) => ({
          ...prev,
          isActive: true,
          workType: "download",
        }));
        setActiveIndex(null);
        return;
      }
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
        setActiveIndex(null);
      }
    } catch (error) {
      toast.error("Failed to open the file. Please try again.");
    } finally {
      reset();
    }
  };

  return (
    <>
      {protectedFile.isActive && (
        <ProtectedPass
          setFileData={setFileData}
          protectedFile={protectedFile}
          setActiveIndex={setActiveIndex}
          setProtectedFile={setProtectedFile}
        />
      )}
      <div className="h-full w-[100%] md:w-[96%]">
        {isGridMode ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-4 my-2 md:my-4">
            {parentFolder?.files
              ?.filter((item) => (showStarredOnly ? item?.is_starred : true))
              .map((item, index) => (
                <div className="relative">
                  <div
                    key={index}
                    onClick={() =>
                      handleFileOpen(item.id, item.is_password_protected)
                    }
                    className="w-[109px] cursor-pointer h-[117px] md:w-[207px] md:h-[213px] flex flex-col "
                  >
                    <div className="flex items-center justify-center h-[80%]  hover:bg-[#f2f3f3] bg-white rounded-[16px] md:rounded-[32px]">
                      {["jpg", "png"].includes(
                        item?.name.split(".").pop() || ""
                      ) ||
                      (item?.content_type &&
                        item.content_type.includes("image/")) ? (
                        <>
                          <div className="">
                            <Gallery
                              className={`w-[32px] h-[41px] md:w-[77px] md:h-[79px] ${
                                item?.is_password_protected ? "blur-sm" : ""
                              }`}
                            />
                            {item?.is_password_protected && (
                              <p className="absolute top-3 right-6 md:top-14 md:right-[75px]">
                                <GoLock className="text-6xl" />
                              </p>
                            )}
                          </div>
                        </>
                      ) : null}
                      {["xls", "xlsx"].includes(
                        item?.name.split(".").pop() || ""
                      ) ||
                      (item?.content_type &&
                        item.content_type.includes(
                          "application/vnd.ms-excel"
                        )) ||
                      item.content_type.includes(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      ) ? (
                        <>
                          <div className="">
                            <p
                              className={`${
                                item?.is_password_protected ? "blur-sm" : ""
                              }`}
                            >
                              <Xcel
                                className={`w-[32px] h-[41px] md:w-[77px] md:h-[79px]`}
                              />
                            </p>
                            {item?.is_password_protected && (
                              <p className="absolute top-3 right-6 md:top-14 md:right-[75px]">
                                <GoLock className="text-6xl" />
                              </p>
                            )}
                          </div>
                        </>
                      ) : null}

                      {item?.name.split(".").pop() === "txt" ||
                      (item?.content_type &&
                        item.content_type.includes("text/plain")) ? (
                        <div className="">
                          {" "}
                          <img
                            src="/doc.svg"
                            className={`w-[40px] h-[40px] md:w-[77px] md:h-[77px]${
                              item?.is_password_protected ? "blur-sm" : ""
                            }`}
                          />
                          {item?.is_password_protected && (
                            <p className="absolute top-3 right-6 md:top-14 md:right-[75px]">
                              <GoLock className="text-6xl" />
                            </p>
                          )}
                        </div>
                      ) : null}

                      {item?.name.split(".").pop() === "pdf" ||
                      (item?.content_type &&
                        item.content_type.includes("application/pdf")) ? (
                        <div className="">
                          <img
                            src="/pdf.png"
                            className={`w-[32px] h-[41px] md:w-[77px] md:h-[79px]${
                              item?.is_password_protected ? "blur-sm" : ""
                            }`}
                          />
                          {item?.is_password_protected && (
                            <p className="absolute top-3 right-6 md:top-14 md:right-[75px]">
                              <GoLock className="text-6xl" />
                            </p>
                          )}
                        </div>
                      ) : null}

                      {["doc", "docx"].includes(
                        item?.name.split(".").pop() || ""
                      ) ||
                      (item?.content_type &&
                        (item.content_type.includes("application/msword") ||
                          item.content_type.includes(
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ))) ? (
                        <div className="">
                          {" "}
                          <img
                            src="/rich.png"
                            className={`w-[40px] h-[40px] md:w-[77px] md:h-[77px] ${
                              item?.is_password_protected ? "blur-sm" : ""
                            }`}
                          />
                          {item?.is_password_protected && (
                            <p className="absolute top-3 right-6 md:top-14 md:right-[75px]">
                              <GoLock className="text-6xl" />
                            </p>
                          )}
                        </div>
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
                            {item?.name.length > 10
                              ? item.name.includes(".")
                                ? `${item.name.slice(0, 10)}...${item.name
                                    .split(".")
                                    .pop()}`
                                : `${item.name.slice(0, 10)}...`
                              : item.name}
                          </span>
                          <span className="text-[#00000069]">
                            {item?.name.split(".").pop()} .{" "}
                            {formatFileSize(item?.size)}
                          </span>
                        </p>
                      </div>
                      <span
                        onClick={(event) => handlePopupToggle({ index, event })}
                        className="cursor-pointer relative"
                      >
                        <ThreeDots />
                      </span>

                      {fileData && (
                        <FileViewer
                          fileUrl={fileData?.fileUrl}
                          fileType={
                            fileData.fileType as "excel" | "word" | "pdf"
                          }
                          fileName={fileData?.fileName}
                        />
                      )}
                    </div>
                    {/* {metaToggle && (
                  <MetaData
                    meta={item?.metadata}
                    name={item?.name}
                    setMetaToggle={setMetaToggle}
                    id={item?.id}
                  />
                )} */}
                  </div>
                  {activeIndex === index && (
                    <div
                      ref={popupRef}
                      className="absolute w-auto right-3 md:right-6 -bottom-[164px]  bg-white rounded-lg shadow-lg p-3 border z-50"
                    >
                      <CustomPopup
                        file={item}
                        id={item?.id}
                        name={item?.name}
                        meta={item?.metadata}
                        metaToggle={metaToggle}
                        setMetaToggle={setMetaToggle}
                        setActiveIndex={setActiveIndex}
                        handleDeleteClick={() => handleDeleteClick(item.id)}
                        handleDownloadClick={() =>
                          handleDownloadClick(
                            item.id,
                            item.is_password_protected
                          )
                        }
                        // handleMetaData={() => handleMetaData(item.metadata)}
                        handleStarClick={() =>
                          handleStarClick(item.name, item.id)
                        }
                        handleUnStarClick={() =>
                          handleUnStarClick(item.name, item.id)
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="container md:rounded-xl md:border w-full h-full my-4">
            <div className="h-full rounded-xl bg-[#F1F5FA] w-[full] flex flex-col ">
              <div className="overflow-hidden rounded-xl hidden md:flex bg-[#F1F5FA] w-[full] text-[14px] h-[57px]  font-sans  justify-between items-center">
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
                  <div className="relative">
                    <div
                      key={index}
                      onClick={() =>
                        handleFileOpen(file.id, file.is_password_protected)
                      }
                      className="overflow-hidden cursor-pointer bg-white hover:bg-[#f2f3f3] w-[full] text-[14px] h-[57px] hidden font-sans md:flex justify-between items-center"
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
                        <div className="flex justify-center gap-1 ">
                          {["xls", "xlsx"].includes(
                            file?.name.split(".").pop() || ""
                          ) ||
                          (file?.content_type &&
                            (file.content_type.includes("excel") ||
                              file.content_type.includes("spreadsheet"))) ? (
                                <div className="">
                                {" "}
                                <p
                                  className={`${
                                    file?.is_password_protected
                                      ? "blur-[2px]"
                                      : ""
                                  }`}
                                >
                                  <Xcel className={`w-4 h-4`} />
                                </p>
                                {file?.is_password_protected && (
                                  <p className="absolute top-5">
                                    <GoLock />
                                  </p>
                                )}
                              </div>
                          ) : null}
                          {["doc", "docx"].includes(
                            file?.name.split(".").pop() || ""
                          ) ||
                          (file?.content_type &&
                            (file.content_type.includes("application/msword") ||
                              file.content_type.includes(
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              ))) ? (
                                <div className="relative">
                                <p
                                  className={`${
                                    file?.is_password_protected
                                      ? "blur-[2px]"
                                      : ""
                                  }`}
                                >
                                  {" "}
                                  <ShortRich />
                                </p>
                                <p>
                                  {" "}
                                  {file?.is_password_protected && (
                                    <p className="absolute top-1 right-[2px]">
                                      <GoLock />
                                    </p>
                                  )}
                                </p>
                              </div>
                          ) : null}
                          {file?.name.split(".").pop() === "txt" ||
                          (file?.content_type &&
                            file.content_type.includes("text/plain")) ? (
                              <div className="">
                              <p
                                className={`${
                                  file?.is_password_protected
                                    ? "blur-[2px]"
                                    : ""
                                }`}
                              >
                                <img
                                  src="rich.png"
                                  alt=""
                                  className="w-4 h-4"
                                />
                              </p>
                              <p>
                                {" "}
                                {file?.is_password_protected && (
                                  <p className="absolute top-5">
                                    <GoLock />
                                  </p>
                                )}
                              </p>
                            </div>
                          ) : null}
                          {["jpg", "png"].includes(
                            file?.name.split(".").pop() || ""
                          ) ||
                          (file?.content_type &&
                            (file.content_type.includes("image/jpeg") ||
                              file.content_type.includes("image/png"))) ? (
                                <div className="">
                                <p
                                  className={`${
                                    file?.is_password_protected
                                      ? "blur-[2px]"
                                      : ""
                                  }`}
                                >
                                  {" "}
                                  <Gallery className="w-3 h-3 md:w-4 md:h-4" />
                                </p>
                                <p>
                                  {" "}
                                  {file?.is_password_protected && (
                                    <p className="absolute top-5">
                                      <GoLock />
                                    </p>
                                  )}
                                </p>
                              </div>
                          ) : null}
                          {file?.name.split(".").pop() === "pdf" && (
                           <div className="">
                           <p
                             className={`${
                               file?.is_password_protected
                                 ? "blur-[2px]"
                                 : ""
                             }`}
                           >
                             <img
                               src="/pdf.png"
                               className="w-3 h-3 md:w-4 md:h-4"
                             />
                           </p>
                           <p>
                             {" "}
                             {file?.is_password_protected && (
                               <p className="absolute top-5">
                                 <GoLock />
                               </p>
                             )}
                           </p>
                         </div>
                          )}
                          <p className="whitespace-nowrap">
                            {file?.name.length > 10
                              ? file.name.includes(".")
                                ? `${file.name.slice(0, 10)}...${file.name
                                    .split(".")
                                    .pop()}`
                                : `${file.name.slice(0, 10)}...`
                              : file.name}
                          </p>
                        </div>
                      </p>
                      <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                        {Array.isArray(file.shared_with) &&
                        file.shared_with.length > 0 ? (
                          <>
                            <img src="per1.png" alt="Person" />{" "}
                            {file.personName}
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
                          fileType={
                            fileData.fileType as "excel" | "word" | "pdf"
                          }
                          fileName={fileData?.fileName}
                        />
                      )}
                      <div
                        onClick={(event) => handlePopupToggle({ index, event })}
                        className="cursor-pointer border w-[10%] h-full flex items-center justify-start px-4"
                      >
                        <ThreeDots />
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        handleFileOpen(file.id, file.is_password_protected)
                      }
                      className="w-full h-[74px] my-2  rounded-tl-[12px] rounded-tr-[12px] bg-[#FFFFFF] md:hidden flex flex-col items-center"
                    >
                      <div className="h-[50%] w-full bg-[#F1F5FA] rounded-tl-[12px] rounded-tr-[12px] px-2 pr-4 flex justify-between items-center">
                        <p className="flex items-center font-sans text-[11px]">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setRadioClick((prev) => !prev);
                            }}
                            className="w-auto text-start mr-4 cursor-pointer"
                          >
                            <Circle color={radioClick ? "#2676ff" : "none"} />
                          </span>
                          {/* Check file extension and content type */}
                          <div className="flex justify-center gap-1 ">
                          {["xls", "xlsx"].includes(
                            file?.name.split(".").pop() || ""
                          ) ||
                          (file?.content_type &&
                            (file.content_type.includes("excel") ||
                              file.content_type.includes("spreadsheet"))) ? (
                                <div className="">
                                {" "}
                                <p
                                  className={`${
                                    file?.is_password_protected
                                      ? "blur-[2px]"
                                      : ""
                                  }`}
                                >
                                  <Xcel className={`w-4 h-4`} />
                                </p>
                                {file?.is_password_protected && (
                                  <p className="absolute top-5">
                                    <GoLock />
                                  </p>
                                )}
                              </div>
                          ) : null}
                          {["doc", "docx"].includes(
                            file?.name.split(".").pop() || ""
                          ) ||
                          (file?.content_type &&
                            (file.content_type.includes("application/msword") ||
                              file.content_type.includes(
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              ))) ? (
                                <div className="relative">
                                <p
                                  className={`${
                                    file?.is_password_protected
                                      ? "blur-[2px]"
                                      : ""
                                  }`}
                                >
                                  {" "}
                                  <ShortRich />
                                </p>
                                <p>
                                  {" "}
                                  {file?.is_password_protected && (
                                    <p className="absolute top-1 right-[2px]">
                                      <GoLock />
                                    </p>
                                  )}
                                </p>
                              </div>
                          ) : null}
                          {file?.name.split(".").pop() === "txt" ||
                          (file?.content_type &&
                            file.content_type.includes("text/plain")) ? (
                              <div className="">
                              <p
                                className={`${
                                  file?.is_password_protected
                                    ? "blur-[2px]"
                                    : ""
                                }`}
                              >
                                <img
                                  src="rich.png"
                                  alt=""
                                  className="w-4 h-4"
                                />
                              </p>
                              <p>
                                {" "}
                                {file?.is_password_protected && (
                                  <p className="absolute top-5">
                                    <GoLock />
                                  </p>
                                )}
                              </p>
                            </div>
                          ) : null}
                          {["jpg", "png"].includes(
                            file?.name.split(".").pop() || ""
                          ) ||
                          (file?.content_type &&
                            (file.content_type.includes("image/jpeg") ||
                              file.content_type.includes("image/png"))) ? (
                                <div className="">
                                <p
                                  className={`${
                                    file?.is_password_protected
                                      ? "blur-[2px]"
                                      : ""
                                  }`}
                                >
                                  {" "}
                                  <Gallery className="w-3 h-3 md:w-4 md:h-4" />
                                </p>
                                <p>
                                  {" "}
                                  {file?.is_password_protected && (
                                    <p className="absolute top-5">
                                      <GoLock />
                                    </p>
                                  )}
                                </p>
                              </div>
                          ) : null}
                          {file?.name.split(".").pop() === "pdf" && (
                           <div className="">
                           <p
                             className={`${
                               file?.is_password_protected
                                 ? "blur-[2px]"
                                 : ""
                             }`}
                           >
                             <img
                               src="/pdf.png"
                               className="w-3 h-3 md:w-4 md:h-4"
                             />
                           </p>
                           <p>
                             {" "}
                             {file?.is_password_protected && (
                               <p className="absolute top-5">
                                 <GoLock />
                               </p>
                             )}
                           </p>
                         </div>
                          )}
                          <p className="whitespace-nowrap">
                            {file?.name.length > 10
                              ? file.name.includes(".")
                                ? `${file.name.slice(0, 10)}...${file.name
                                    .split(".")
                                    .pop()}`
                                : `${file.name.slice(0, 10)}...`
                              : file.name}
                          </p>
                        </div>
                        </p>
                        <div
                          onClick={(event) => handlePopupToggle({ index, event })}
                          className="cursor-pointer w-full h-full flex items-center justify-end px-4"
                        >
                          <ThreeDots />
                        </div>
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
                    {activeIndex === index && (
                      <div
                        ref={popupRef}
                        className="absolute w-auto right-0 top-8 bg-white rounded-lg shadow-lg p-3 border z-50"
                      >
                        <CustomPopup
                          file={file}
                          id={file?.id}
                          name={file?.name}
                          meta={file?.metadata}
                          metaToggle={metaToggle}
                          setMetaToggle={setMetaToggle}
                          setActiveIndex={setActiveIndex}
                          handleDeleteClick={() => handleDeleteClick(file.id)}
                          handleDownloadClick={() =>
                            handleDownloadClick(
                              file.id,
                              file.is_password_protected
                            )
                          }
                          // handleMetaData={() => handleMetaData(item.metadata)}
                          handleStarClick={() =>
                            handleStarClick(file.name, file.id)
                          }
                          handleUnStarClick={() =>
                            handleUnStarClick(file.name, file.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
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
