import { useState } from "react";
import { Cross } from "../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { postData } from "../features/ApiSlice";
import { getDirectory } from "../features/directories/folderSlice";

type ReNameFileProps = {
  fileId: any;
  setActiveIndex: any;
  settoggleReName: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReNameFile({
  fileId,
  settoggleReName,
  setActiveIndex,
}: ReNameFileProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");

  const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
  const data = useSelector((state: RootState) => state.api.calls?.reName);
  const message = data?.error?.user_address.detail;

  const handleSubmit = async () => {
    const paylod = {
      name: value,
    };
    try {
      await dispatch(
        postData({
          url: `files/${fileId}/`,
          payload: paylod,
          method: "patch",
          key: "reName",
        })
      ).unwrap();
      settoggleReName(false);
      setActiveIndex(null);
      toast.success("Name changed successfully");
      dispatch(getDirectory(parentFolderId));

    } catch (error: any) {
      toast.warn(error.detail);

    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="relative py-11 w-[75vw] md:w-[59vw] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
        <span
          onClick={() => {
            settoggleReName(false);
          }}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
        </span>

        <div className="flex flex-col items-start w-full justify-start text-[12px] md:text-[14px] text-black">
          <p className="font-sans text-[16px] text-center w-full md:text-2xl font-bold mb-3">
            Enter new file name
          </p>
          <div className="h-[36px] mb-4 w-[97%] md:h-[54px] bg-[#ECECEC] rounded-md px-3 mt-3 md:mt-5">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="New name"
              className="w-full h-full outline-none text-[12px] font-sans font-[500] md:font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={value === ""}
          style={{
            background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
            borderImageSource:
              "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
          }}
          className="w-[122px] h-[30px] disabled:opacity-75 disabled:cursor-not-allowed md:w-[163px] md:h-[42px] rounded-xl text-white font-sans text-[11.5px] md:text-[13px] mt-3 md:mt-5 flex justify-center items-center"
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

export default ReNameFile;
