import { useState } from "react";
// import { Cross, BlurLock } from "../assets/Icons";
import { Cross } from "../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { postData } from "../features/ApiSlice";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { getDirectory } from "../features/directories/folderSlice";

type ReNameFileProps = {
  fileId: any;
  setActiveIndex: any;
  settogglePassword: React.Dispatch<React.SetStateAction<boolean>>;
};

function SetPassword({
  fileId,
  settogglePassword,
  setActiveIndex,
}: ReNameFileProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [view, setView] = useState(false);
  const [confirmView, setConfirmView] = useState(false);

  const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
  const data = useSelector((state: RootState) => state.api.calls?.setPassword);

  const handleSubmit = async () => {
    if (value !== confirmValue) {
      toast.error("Password does not match");
      return;
    }
    const paylod = {
      password: value,
    };
    try {
      await dispatch(
        postData({
          url: `files/${fileId}/`,
          payload: paylod,
          method: "patch",
          key: "setPassword",
        })
      ).unwrap();
      settogglePassword(false);
      setActiveIndex(null);
      dispatch(getDirectory(parentFolderId));
      toast.success("Password is set to file");
    } catch (error: any) {
      toast.error(error.detail);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="relative py-11 w-[75vw] md:w-[45vw] px-3 md:px-4  flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
        <span
          onClick={() => {
            settogglePassword(false);
          }}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
        </span>

        <div className="flex flex-col items-center justify-center gap-10 mb-10">
          <div className="relative flex items-center justify-center mt-4">
            {" "}
            <div className="w-[80px] h-[80px] bg-blue-300 rounded-full absolute"></div>
            <div className="w-[60px] h-[60px] bg-blue-400 rounded-full absolute"></div>
            <div className="w-[40px] h-[40px] bg-blue-500 rounded-full absolute"></div>
            <span className="text-[24px] absolute shadow-[0px_4px_10px_rgba(0,0,0,0.3)]">
              🔒
            </span>
          </div>

          <p className="sm:text-2xl text-[16px] font-bold mt-5 text-center ">
            Set Password to secure File{" "}
          </p>
        </div>

        <div className="flex flex-col items-start w-full justify-center text-[12px] md:text-[14px] text-black">
          <p className="font-sans sm:text-xl flex items-center justify-center mb-1">
            🔒 <p className="opacity-50 m-2">Enter Password</p>
          </p>
          <div className="h-[36px] flex items-center justify-center mb-4 w-full md:h-[54px] bg-[#ECECEC] rounded-md px-3">
            <input
              value={value}
              required
              minLength={8}
              onChange={(e) => setValue(e.target.value)}
              type={view ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full outline-none text-[12px] font-sans font-[500] md:font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-sm placeholder:text-gray-400"
            />
            {view ? (
              <IoEyeOutline
                onClick={() => setView((prev) => !prev)}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setView((prev) => !prev)}
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
          {value.length > 0 && value.length < 8 && (
            <p className="text-red-500 text-sm">
              Password must be at least 8 characters
            </p>
          )}
        </div>
        <div className="flex flex-col items-start w-full justify-center text-[12px] md:text-[14px] text-black">
          <p className="font-sans sm:text-xl flex  items-center justify-center mb-1">
            🔒 <p className="opacity-50 m-2">Confirm Password</p>
          </p>
          <div className="h-[36px] flex items-center justify-center mb-4 w-full md:h-[54px] bg-[#ECECEC] rounded-md px-3">
            <input
              required
              minLength={8}
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              type={confirmView ? "text" : "password"}
              placeholder="confirm Password"
              className="w-full h-full outline-none text-[12px] font-sans font-[500] md:font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-sm placeholder:text-gray-400"
            />
            {confirmView ? (
              <IoEyeOutline
                onClick={() => setConfirmView((prev) => !prev)}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setConfirmView((prev) => !prev)}
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
          {confirmValue.length > 0 && confirmValue.length < 8 && (
            <p className="text-red-500 text-sm">
              Password must be at least 8 characters
            </p>
          )}
        </div>
        {/* <div className="text-start w-full">
          <p>☝🏻 Set a password hint (optional)</p>
          <p className="pl-1 opacity-50">
            A password hint can help you remember your password, but avoid using
            the actual password or obvious clues
          </p>
          <textarea className="border-2 w-full " name="" id=""></textarea>
        </div> */}

        <button
          onClick={handleSubmit}
          disabled={value.length < 8}
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

export default SetPassword;
