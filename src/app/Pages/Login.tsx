import { useState } from "react";
import Words from "../../assets/Seeds";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateToken } from "../../features/authentication/authSlice";
import { ThreeDots } from "react-loader-spinner";
import { AppDispatch, RootState } from "../store";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isTokenLoading } = useSelector((state: RootState) => state.auth);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [seedsValue, setSeedsValue] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        const filteredSuggestions = Words.filter((word) =>
          word.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setInputValue("");
        setSuggestions([]);
        if (filteredSuggestions.length <= 0) {
          return;
        }
        setSeedsValue([...seedsValue, filteredSuggestions[0]]);
        break;
      case "Backspace":
        if (inputValue === "") {
          setSeedsValue(seedsValue.slice(0, seedsValue.length - 1));
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value.split(" ").length > 1) {
      setSeedsValue(value.split(" "));
      setInputValue("");
    }
    if (value.length > 0) {
      const filteredSuggestions = Words.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue("");
    setSeedsValue([...seedsValue, suggestion]);
    setSuggestions([]);
  };
  const removeSeed = (indexToRemove: number) => {
    setSeedsValue(seedsValue.filter((_, index) => index !== indexToRemove));
  };

  const handleLogin = () => {
    dispatch(generateToken(seedsValue.join(" ")))
      .unwrap()
      .then((res) => {
        toast.success("Login Successfully");
        navigate("/");
        login();
        localStorage.setItem("access_token", res.access);
        
      })
      .catch((error) => {
        console.error("Token generation failed:", error);
      });
  };

  return (
    <div className="bg-white">
      <div className="relative flex w-full h-[100vh] p-4 justify-between">
        <div className="absolute flex items-center justify-center -left-[9vw] right-0 top-[8vh]">
          <p className="text-[14px] font-sans">
            Need Help?{" "}
            <p className="text-[#d8d8d8] whitespace-nowrap">Ask any question</p>
          </p>
          <img src="/img2.png" alt="" className="w-20 h-20" />
        </div>
        <div className="flex flex-col w-[40vw]">
          <span className="flex gap-2 md:pr-7 items-center md:border-r border-white">
            <img src="/logo.svg" alt="" className="w-7 h-6" />
            <p className="font-chakra text-[16px] md:text-[22px] text-black">
              NeuroDrive
            </p>
          </span>
          <div className="flex flex-col items-center justify-center h-full w-full gap-12">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-[#202343] text-[48px]">Login Account</h1>
              <p className="text-[#202343] text-[18px] font-sans">
                Don’t have any account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-600 cursor-pointer"
                >
                  Register here
                </span>
              </p>
            </div>

            <div className="relative">
              <div className="w-[38vw] min-h-[172px] px-2.5 pb-2.5 pt-4 border border-[#BABABA] rounded-lg">
                <div
                  className={`${
                    seedsValue.length < 16 ? "border-b" : "border-none"
                  } flex flex-wrap w-full gap-1 border-[#BABABA4D] pb-2`}
                >
                  {seedsValue?.map((seed, index) => (
                    <span
                      key={index}
                      className="group min-w-[50px] cursor-pointer  md:min-w-[69px] h-[20px] px-1 md:h-[27px] text-[12px] md:text-[16px] border-[1px] border-[#9F42FF] flex justify-center items-center rounded-[4px] md:rounded-[6px] font-sans"
                    >
                      {seed}
                      <span
                        className="cursor-pointer ml-1  text-[#ab1c1c] text-xl hidden group-hover:inline"
                        onClick={() => removeSeed(index)}
                      >
                        x
                      </span>
                    </span>
                  ))}
                  {seedsValue.length < 16 && (
                    <input
                      value={inputValue}
                      onChange={(e) => handleInputChange(e)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your key seed..."
                      className={`text-sm placeholder:text-[#00000036] mt-2 ml-1 bg-transparent font-sans outline-none `}
                    />
                  )}
                </div>
                <label
                  htmlFor="key"
                  className="absolute text-lg font-sans text-black dark:text-gray-400  transform -translate-y-4 ml-2 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2  start-1"
                >
                  key Seed
                </label>
                <div className="flex w-[310px] md:w-full mq1100:w-[451px] gap-[8px] mt-[11px] flex-wrap">
                  {suggestions.map((seed, index) => (
                    <span
                      onClick={() => handleSuggestionClick(seed)}
                      key={index}
                      className="min-w-[50px] cursor-pointer md:min-w-[69px] h-[20px] px-1 md:h-[27px] text-[12px] md:text-[16px] border-[1px] border-[#9F42FF] flex justify-center rounded-[4px] md:rounded-[6px] font-sans"
                    >
                      {seed}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogin}
              style={{
                background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                borderImageSource:
                  "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
              }}
              className="w-[202px] h-[48px] flex justify-center items-center text-white hover:shadow-lg shadow-black border-[1.16px] rounded-[13px] text-[15px] font-sans text-center"
            >
              Login Now
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
            src="/login-bg.svg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-end  w-full font-sans text-[#1E1E1E66] pl-2 pb-1 text-[14px]">
        <p className="pr-3 border-r-[1.17px] border-[#1E1E1E66]">
          Terms & Conditions
        </p>
        <p className="pl-3">Privacy Policy</p>
      </div>
    </div>
  );
}

export default Login;
