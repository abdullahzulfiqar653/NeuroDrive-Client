import { useState } from "react";
import { Cross } from "../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { postData } from "../features/ApiSlice";
import { getDirectory } from "../features/directories/folderSlice";

type ReNameFileProps = {
  setActiveIndex: any;
  protectedFile: any;
  setFileData: React.Dispatch<
    React.SetStateAction<{
      fileUrl: string;
      fileType: "excel" | "word" | "pdf" | "unknown";
      fileName: string;
    } | null>
  >;
  setProtectedFile: React.Dispatch<
    React.SetStateAction<{ isActive: boolean; workType: string }>
  >;
};

function ProtectedPass({
  setActiveIndex,
  protectedFile,
  setProtectedFile,
  setFileData,
}: ReNameFileProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");

  const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
  const fileId = localStorage.getItem("fileId") ?? "";
  const data = useSelector(
    (state: RootState) => state.api.calls?.protectedFile
  );
  console.log(data);

  const handleSubmit = async () => {
    try {
      const paylod = {
        password: value,
      };
      if (protectedFile.workType === "download") {
        const response = await dispatch(
          postData({
            url: `files/password-protected/${fileId}/`,
            payload: paylod,
            method: "post",
            key: "DprotectedFile",
          })
        ).unwrap();
        if (response && response.data) {
          const { url, name } = response.data;
          const link = document.createElement("a");
          link.href = url;
          link.download = name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("file Downloaded Successfully");
          setActiveIndex(null);
        }
      }
      if (protectedFile.workType === "downloadOpen") {
        const result = await dispatch(
          postData({
            url: `files/password-protected/${fileId}/`,
            payload: paylod,
            method: "post",
            key: "OprotectedFile",
          })
        ).unwrap();
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
            setFileData({
              fileUrl: url,
              fileType: mapContentTypeToFileType(content_type),
              fileName: name,
            });
          }
        }
      }
      setProtectedFile((prev) => ({ ...prev, isActive: false }));
      setActiveIndex(null);
      dispatch(getDirectory(parentFolderId));
      //   toast.success("Password matched");
    } catch (error) {
      toast.warn("Wrong Password");
      console.log("error", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="relative py-11 w-[59vw] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
        <span
          onClick={() => {
            setProtectedFile((prev) => ({ ...prev, isActive: false }));
          }}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
        </span>

        <div className="flex flex-col items-start w-full justify-start text-[12px] md:text-[14px] text-black">
          <p className="font-sans text-2xl font-bold mb-3">Enter password</p>
          <div className="h-[36px] mb-4 w-[97%] md:h-[54px] bg-[#ECECEC] rounded-md px-3">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="password"
              placeholder="Password"
              required
              minLength={8}
              className="w-full h-full outline-none text-[12px] font-sans font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-sm placeholder:text-gray-400"
            />
          </div>
          {value.length > 0 && value.length < 8 && (
            <p className="text-red-500 text-sm">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={value.length < 8}
          style={{
            background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
            borderImageSource:
              "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
          }}
          className="w-[132px] h-[34px] disabled:opacity-75 disabled:cursor-not-allowed md:w-[163px] md:h-[42px] rounded-xl text-white font-sans text-[13px] mt-3 md:mt-5 flex justify-center items-center"
        >
          Confirm
          {data?.isLoading && (
            <span className="ml-2">
              <ThreeDots height="25" width="25" color="white" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProtectedPass;

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
