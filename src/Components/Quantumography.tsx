import React, { useState } from "react";
import { Cross } from "../assets/Icons";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { postData } from "../features/ApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { getDirectory } from "../features/directories/folderSlice";

const Quantumography = ({ setToggleQuantumography }: any) => {
  const [step, setStep] = useState(1);
  const [coverUrl, setCoverUrl] = useState("");
  const [secertUrl, setSecertUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showSteps, setShowSteps] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [File, setFile] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const MAX_FILE_SIZE = 500 * 1024;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/jpg"].includes(file?.type)) {
        toast.warn("Wrong file type!");
        setFile(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.warn("File size must be less than 500KB!");
        setFile(null);
        return;
      }
      setFile(file);
    }
    event.target.value = "";
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      if (!["image/jpeg", "image/jpg"].includes(file?.type)) {
        toast.warn("Wrong file type!");
        setFile(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.warn("File size must be less than 500KB!");
        setFile(null);
        return;
      }
      setFile(file);
    }
  };
  const handleSubmit = async () => {
    if (!File) {
      toast.warn("Please select a file");
      return;
    }

    try {
      if (step === 1) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", File);
        formData.append("type", "cover");
        const { data } = await axios.post(
          "https://qa.neuronus.net/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          setIsLoading(false);
          setCoverUrl(data?.image_url);
          setStep(2);
          setFile(null);
        }
        return;
      }
      if (step === 2) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", File);
        formData.append("type", "secret");
        const { data } = await axios.post(
          "https://qa.neuronus.net/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          setIsLoading(false);
          setSecertUrl(data?.image_url);
          setShowUpload(true);
          setStep(3);
        }
        return;
      }
      if (step === 3) {
        setIsLoading(true);
        const paylod = {
          original: coverUrl,
          password: "",
          offset: 100,
          amount: 0,
          is_paid: 1,
          secret_file: secertUrl,
        };
        const { data } = await axios.post(
          "https://qa.neuronus.net/vangonography_encode",
          paylod,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data) {
          console.log(data?.path);
          setDownloadUrl(data?.path);
          setIsLoading(false);
          setSecertUrl(data);
          setShowUpload(true);
          setStep(4);
          setShowSteps(true);
        }
        return;
      }
      if (step === 4) {
        if (downloadUrl !== "") {
          const paylod = {
            url: downloadUrl,
          };
          const response = await axios.post(
            "https://drive.api.azsoft.dev/api/media/file-download/",
            paylod,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
              responseType: "blob",
            }
          );
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          const filename =
            downloadUrl.split("/").pop() || `download_${Date.now()}.png`;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("File Downloaded Successfully");
        }
        return;
      }
    } catch (error) {
      toast.warn("Something wents wrong!");
    }
  };

  const handleFileUpload = async () => {
    try {
      if (downloadUrl !== "") {
        const paylod = {
          url: downloadUrl,
        };
        const response = await axios.post(
          "https://drive.api.azsoft.dev/api/media/file-download/",
          paylod,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const formData = new FormData();
        const filename =
          downloadUrl.split("/").pop() || `file_${Date.now()}.png`;
        formData.append("file", blob, filename);
        const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";

        await dispatch(
          postData({
            url: `/directories/${parentFolderId}/files/`,
            payload: formData,
            method: "post",
            key: "uploadFile",
          })
        ).unwrap();
        toast.success("File uploaded Successfully");
        dispatch(getDirectory(parentFolderId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="relative py-6 w-[80vw] md:w-[60vw] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
        <span
          onClick={() => {
            setToggleQuantumography(false);
          }}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
        </span>
        <div className="flex flex-col px-6 items-start w-full justify-start text-[12px] md:text-[14px] text-black">
          <h1 className=" font-[600] md:font-bold text-[17px] md:text-3xl text-center w-full">
            Quantumography
          </h1>
          {showSteps ? (
            ""
          ) : (
            <div className="w-full flex gap-7 my-6 justify-center">
              <div className="">
                <p
                  className={`${
                    step === 1 ? "text-black" : "text-gray-400"
                  } text-[8.5px] md:text-[10px] whitespace-nowrap font-thin`}
                >
                  1/3 {step === 1 && "- Upload cover file"}
                </p>
                <div
                  className={`w-20 md:w-32 h-1 rounded ${
                    step === 1 ? "bg-[#005EFF]" : "bg-[#87acec]"
                  }`}
                ></div>
              </div>
              <div className="">
                <p
                  className={`${
                    step === 2 ? "text-black" : "text-gray-400"
                  } text-[8.5px] md:text-[10px] whitespace-nowrap  font-thin`}
                >
                  2/3 {step === 2 && "- Upload private file"}
                </p>
                <div
                  className={`w-20 md:w-32  h-1 rounded ${
                    step === 2 ? "bg-[#005EFF]" : "bg-[#87acec]"
                  }`}
                ></div>
              </div>
              <div className="">
                <p
                  className={`${
                    step === 3 ? "text-black" : "text-gray-400"
                  } text-[8.5px] md:text-[10px] whitespace-nowrap  font-thin`}
                >
                  3/3 {step === 3 && "- Encrpt file"}
                </p>
                <div
                  className={`w-20 md:w-32  h-1 rounded ${
                    step === 3 ? "bg-[#005EFF]" : "bg-[#87acec]"
                  }`}
                ></div>
              </div>
            </div>
          )}
          <div>
            {!showUpload && (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center w-[50vw] ml-3 p-5 my-5 mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-[#005EFF]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>

                <h2 className="mt-1 font-medium tracking-wide text-[#005EFF]">
                  {File?.name || (step === 1 ? "Cover File" : "Secret File")}
                </h2>

                <p className="mt-2 text-xs tracking-wide text-[#005EFF]">
                  Upload or darg & drop your file JPG or JPEG.{" "}
                </p>

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
          {step === 3 && (
            <div className="text-3xl my-6 w-full">
              {File && (
                <div className="flex flex-col items-center justify-center">
                  {/* Display Image Preview */}
                  <img
                    src={URL.createObjectURL(File)}
                    alt="Selected File"
                    className="w-32 h-32 object-cover rounded-lg shadow-lg"
                  />
                  {/* Display File Name */}
                  <p className="text-lg mt-2 text-gray-700">{File.name}</p>
                </div>
              )}
            </div>
          )}
          {step === 4 &&
            (isLoading ? (
              <div className="w-full my-9 flex justify-center items-center">
                <ThreeDots />
              </div>
            ) : (
              <div className="w-full my-9 flex justify-center items-center">
                <div className="relative flex justify-center items-center bg-transparent">
                  <video
                    src="success.webm"
                    autoPlay
                    muted
                    className="w-[100px] h-[100px] rounded-lg"
                  />
                </div>
                <p>Your encrypted file is ready.</p>
              </div>
            ))}

          <div
            className={`${
              step === 3 ? "flex justify-between" : ""
            } w-full flex justify-center`}
          >
            <button
              onClick={handleSubmit}
              disabled={!File || isLoading}
              style={{
                background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                borderImageSource:
                  "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
              }}
              className="mx-auto w-[160px] h-[30px] disabled:opacity-75 disabled:cursor-not-allowed md:w-[173px] md:h-[42px] rounded-md md:rounded-xl text-white font-sans text-[13px] mt-3 md:mt-5 flex justify-center items-center"
            >
              {step === 1
                ? "Upload cover file!"
                : step === 2
                ? "Upload secret file!"
                : step === 3
                ? "Start encryption"
                : "Download encrypted file!"}
              {isLoading && (
                <span className="ml-2">
                  <ThreeDots height="25" width="25" color="white" />
                </span>
              )}
            </button>
            {step === 4 && (
              <button
                onClick={handleFileUpload}
                //   disabled={value === ""}
                style={{
                  background:
                    "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                  borderImageSource:
                    "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
                }}
                className="mx-auto w-[170px] h-[34px] disabled:opacity-75 disabled:cursor-not-allowed md:w-[173px] md:h-[42px] rounded-xl text-white font-sans text-[13px] mt-3 md:mt-5 flex justify-center items-center"
              >
                Upload to folder
                {isLoading && (
                  <span className="ml-2">
                    <ThreeDots height="25" width="25" color="white" />
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantumography;