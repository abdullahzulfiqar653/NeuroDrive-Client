import { useEffect, useState } from "react";
import { CheckMark, CopySeeds, Save, TickIcon } from "../assets/Icons";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeeds,
  generateToken,
} from "../features/authentication/authSlice";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";

function RegisterSeeds() {
  const { signup } = useAuth();
  const [copytext, setCopyText] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { seeds, isSeedsLoading, isTokenLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchSeeds());
  }, [dispatch]);

  const copyToClipBoard = () => {
    setCopyText(true);
    navigator.clipboard.writeText(seeds);
    setTimeout(() => {
      setCopyText(false);
    }, 700);
  };

  const handleRegister = () => {
    dispatch(generateToken(seeds))
      .unwrap()
      .then((res) => {
        localStorage.setItem("access_token", res.access);
        toast.success("Successfully Registered");
        navigate("/");
        signup();
      })
      .catch((error) => {
        console.error("Token generation failed:", error);
      });
  };

  return (
    <div className="relative flex w-full h-[100vh] p-4 justify-between">
      <div className="absolute flex items-center justify-center -left-[9vw] right-0 top-[8vh]">
        <p className="text-[14px] font-sans">
          Need Help?{" "}
          <p className="text-[#d8d8d8] whitespace-nowrap">Ask any question</p>
        </p>
        <img src="/img2.png" alt="" className="w-20 h-20" />
      </div>
      <div className="flex flex-col w-[40vw] gap-3">
        <span className="flex gap-2 md:pr-7 items-center md:border-r border-white">
          <img src="/logo.svg" alt="" className="w-7 h-6" />
          <p className="font-chakra text-[16px] md:text-[22px] text-black">
            NeuroDrive
          </p>
        </span>
        <div className="flex flex-col items-center justify-center h-full w-full gap-12">
          <div className="flex flex-col items-center gap-1">
            <img src="seeds.svg" alt="" />
            <h1 className="text-[#202343] text-[48px]">Your Seed</h1>
            <p className="text-[#202343] text-[18px] font-sans">
              Don’t have any account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>

          <div className="relative w-[38vw]">
            <span className="absolute -top-7 right-2">
              {isSeedsLoading ? (
                <ThreeCircles height="20" width="20" color="black" />
              ) : (
                <CheckMark className="h-6 w-6" />
              )}
            </span>
            <div className="w-full min-h-[172px] px-2.5 pb-2.5 pt-4 border border-[#BABABA] rounded-lg">
              <label
                htmlFor="key"
                className="absolute text-lg font-sans text-black dark:text-gray-400  transform -translate-y-4 ml-2 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2  start-1"
              >
                key Seed
              </label>
              <div className="flex flex-wrap w-full gap-3 p-2">
                {seeds?.split(" ").map((seeds, index) => (
                  <span
                    key={index}
                    className="group min-w-[50px] cursor-pointer  md:min-w-[69px] h-[20px] px-1 md:h-[27px] text-[12px] md:text-[16px] border-[1px] border-[#9F42FF] flex justify-center items-center rounded-[4px] md:rounded-[6px] font-sans"
                  >
                    {seeds}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex font-sans gap-4 mt-2 justify-between text-[13px] w-full items-center">
              <p className="text-[#BABABACC] ">
                Please write these down incase you lose your seed.
              </p>
              <p className="text-[#000000A1] flex gap-1 items-center cursor-pointer">
                <Save className="w-6 h-6" />
                Save
              </p>
              <p
                onClick={copyToClipBoard}
                className="text-[#000000A1] flex gap-2 items-center cursor-pointer"
              >
                {copytext ? (
                  <>
                    <TickIcon className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopySeeds className="w-4 h-4" />
                    Copy
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={handleRegister}
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
            }}
            className="w-[202px] h-[48px] flex justify-center items-center text-white hover:shadow-lg shadow-black border-[1.16px] rounded-[13px] text-[15px] font-sans text-center"
          >
            Next
            {isTokenLoading && (
              <span className="ml-2">
                <ThreeDots height="25" width="25" color="white" />
              </span>
            )}
          </button>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(155.35deg, #3984FF -4.35%, #6860FE 32.93%, #8C44FD 62.55%, #B325FC 94.21%)",
          // backgroundImage: `url('/login-bg.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "50vw",
        }}
        className="rounded-[22px] w-[50%] overflow-hidden "
      >
        <img
          src="/regis-bg.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default RegisterSeeds;
