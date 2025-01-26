import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CopyMail,
  Cross,
  Edit,
  Signout,
  TickIcon,
  VerticalLine,
} from "../assets/Icons";
import { useAuth } from "../AuthContext";
import useApi from "../Hooks/usiApi";
import { CiUser } from "react-icons/ci";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

interface AccountProps {
  className: string;
  profileLoading: boolean;
}

function Account({ className, profileLoading }: AccountProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { logout, setIsAccountOpen } = useAuth();
  const [copytext, setCopyText] = useState(false);

  const { post: uploadPost, reset: uploadReset } = useApi("postProfile");
  const data = useSelector((state: RootState) => state.api.calls?.postProfile);

  const mails = [
    { id: 1, mail: "example@gmail.com" },
    { id: 2, mail: "example2@gmail.com" },
    { id: 3, mail: "example3@gmail.com" },
  ];

  const copyToClipBoard = () => {
    setCopyText(true);
    navigator.clipboard.writeText("Hello");
    setTimeout(() => {
      setCopyText(false);
    }, 700);
  };

  const handleUpload = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    uploadPost({ url: "/user/profile/", payload: formData, method: "put" });

    return () => uploadReset();
  };
  // useEffect(() => {
  //   if (data?.error) {
  //     toast.error("Failed to upload profile");
  //   } else if (data?.response) {
  //     toast.success("Profile changed successfully");
  //   }
  // }, [handleUpload]);

  if (data !== undefined) {
    if (data?.error) {
      toast.error("Failed to upload profile");
    } else if (data?.response) {
      toast.success("Profile changed successfully");
    }
  }

  return (
    <div
      className={`${className} absolute bg-[#EAEEF5] flex flex-col z-20 gap-2 md:gap-6 font-sans text-[#333333] shadow-md shadow-[#00000040] p-4 w-[256px] md:w-[333px] max-h-[358px] md:max-h-[464px] rounded-[16px] md:rounded-[22px] left-[-160px] md:left-[-230px] top-[42px] md:top-[50px]`}
    >
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAccountOpen((prev) => !prev);
          }}
        >
          <Cross className="w-[12px] h-[14px]" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
        <div className="w-[110px] h-[110px] relative bg-white rounded-full flex justify-center items-center">
          <div className="h-[84px] w-[84px] rounded-full cursor-pointer overflow-hidden">
            {profileLoading || data?.isLoading ? (
              <ThreeCircles height="80" width="80" color="black" />
            ) : profile ? (
              <img src={profile} className="w-full h-full object-cover" />
            ) : (
              <CiUser className="h-20 w-20 pl-1" />
            )}
          </div>
          <div className="absolute right-1 bottom-[2px] cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
              id="gallery-button"
            />
            <label
              htmlFor="gallery-button"
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit />
            </label>
          </div>
        </div>
        <p className="text-[10px] md:text-[14px] flex items-center">
          hello@mail.com
          <span
            onClick={copyToClipBoard}
            className="ml-3 cursor-pointer transform hover:scale-110 duration-100"
          >
            {copytext ? <TickIcon /> : <CopyMail />}
          </span>
        </p>
        <div className="w-[226px] md:w-[293px] h-[40px] md:h-[52px] bg-[#F8FBFD] rounded-[99px] pl-2 md:pl-3 mb-3 flex items-center justify-between">
          <p
            onClick={() => {
              navigate("/create-mail");
            }}
            className="text-[9px] md:text-[11px] cursor-pointer flex items-center w-[55%] md:w-[50%]"
          >
            <span className="mr-1">
              <img
                src="/newwallet.svg"
                className="h-[18.52px] w-[18.52px] md:h-[24px] md:w-[24px]"
              />
            </span>
            Add email address
          </p>
          <VerticalLine />
          <p
            onClick={logout}
            className="text-[9px] md:text-[11px] cursor-pointer flex items-center w-[45%] md:w-[50%] ml-4"
          >
            <span className="mr-2">
              <Signout className={"h-[11px] w-[12px]"} />
            </span>
            Sign out
          </p>
        </div>
      </div>
      {mails && (
        <div className="flex flex-col justify-start relative  gap-2 mt-1 md:mt-0">
          <p className="text-[10px] md:text-[12px] font-[500] top-[287px] md:top-[377px]">
            Other Email Address
          </p>
          {mails.map((item, index) => (
            <p
              onClick={() => {
                navigate("/");
              }}
              key={index}
              className="text-[9px] cursor-pointer md:text-[11px] flex items-center gap-2"
            >
              <span className="w-[26px] h-[26px] md:h-[34px] md:w-[34px] rounded-full bg-[#305EFF] flex items-center justify-center text-white">
                {item.mail[0].toUpperCase()}
              </span>
              {item.mail}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;
