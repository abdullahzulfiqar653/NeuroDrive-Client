import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
interface AccountProps {
  className: string;
  profile: string;
  profileLoading: boolean;
  // className?: string;
  // profile: Dispatch<SetStateAction<string>>;
}

function Account({ className, profile, profileLoading }: AccountProps) {
  const navigate = useNavigate();
  const { logout, setIsAccountOpen } = useAuth();
  const [copytext, setCopyText] = useState(false);

  const {
    response: uploadResponse,
    isLoading: uploadLoading,
    post: uploadPost,
    reset: uploadReset,
    error: uploadError,
  } = useApi("postProfile");

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
    if (uploadError?.toString()) {
      toast.error("Falied to upload profile");
    } else toast.success("Profile changed Successfully");
    return () => uploadReset();
  };

  return (
    <div
      className={` ${className} absolute bg-[#EAEEF5] flex flex-col z-20 gap-2 md:gap-9 font-sans text-[#333333] shadow-md shadow-[#00000040] p-4 w-[256px] md:w-[333px] max-h-[358px] md:max-h-[464px] rounded-[16px] md:rounded-[22px] left-[-160px] md:left-[-230px] top-[42px] md:top-[50px]`}
    >
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent propagation to parent elements
            setIsAccountOpen((prev) => !prev);
          }}
        >
          <Cross className="w-[12px] h-[14px]" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
        <div className="w-[110px] h-[110px] relative bg-white rounded-full flex justify-center items-center">
          <div className=" h-[84px] w-[84px] rounded-full cursor-pointer  overflow-hidden">
            {profileLoading || uploadLoading ? (
              <ThreeCircles height="80" width="80" color="black" />
            ) : (
              <img
                src={String(profile)}
                className="w-full h-full object-cover "
              />
            )}
            {/* <p className="bg-[#EB417A] w-full h-full text-[white] flex justify-center items-center text-[40px]">
              {userEmail?.email[0]?.toUpperCase()}
            </p> */}
          </div>
          <div
            // onClick={handleUpload}
            className="absolute right-1 bottom-[2px] cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
              id="gallery-button"
            />
            <label htmlFor="gallery-button" className="cursor-pointer">
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
            className="text-[9px] md:text-[11px] cursor-pointer flex items-center w-[55%] md:w-[50%] "
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
            className="text-[9px] md:text-[11px] cursor-pointer  flex items-center w-[45%] md:w-[50%] ml-4"
          >
            <span className="mr-2">
              <Signout className={"h-[11px] w-[12px]"} />
            </span>
            Sign out
          </p>
        </div>
      </div>
      {mails && (
        <div className="flex flex-col justify-start relative overflow-y-auto gap-2 mt-2 md:mt-0 ">
          <p className="text-[10px] md:text-[12px] font-[500] fixed top-[287px] md:top-[377px]">
            Other Email Address
          </p>
          {mails?.map((item, index) => (
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
