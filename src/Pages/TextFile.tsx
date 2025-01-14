import { Arrow, Download, Invite, Print, SixDots, Xcel } from "../assets/Icons";
import { useAuth } from "../AuthContext";
import Account from "../Components/Account";
import Word from "../Components/Word";
import ExcelSheet from "../Components/ExcelSheet";
import { useFileContext } from "../FileContext";
import PDF from "../Components/PDF";

function TextFile() {
  const { isAccountOpen, setIsAccountOpen, toggleComponent } = useAuth();
  // const queryParams = new URLSearchParams(location.search);
  // const Type = queryParams.get('type');
  const { fileUrl, fileType, fileName } = useFileContext();

  console.log("FileeeeTypeeeee", fileType);

  return (
    <div className="w-[100vw]">
      <div
        style={{
          background: "linear-gradient(90deg, #1D203E 0%, #4D55A4 100%)",
        }}
        className="flex w-full h-[10vh] min-h-[68px] items-center justify-between md:pl-4 px-2 md:pr-5"
      >
        <div className="flex items-center">
          <span className="flex gap-2 md:pr-7 items-center md:border-r border-white">
            <img src="/logo.svg" alt="" className="w-7 h-6" />
            <p className="font-chakra text-[16px] md:text-[22px] text-white">
              NeuroDrive
            </p>
          </span>
          <span className="md:flex items-center gap-2 pl-7 hidden">
            <>
              {fileType === "word" && (
                <img src="/rich.png" alt="" className="w-[26px] h-[26px]" />
              )}
              {fileType === "excel" && <Xcel className="w-[26px] h-[26px]" />}
              {fileType === "pdf" && (
                <img src="/pdf.png" alt="" className="w-[26px] h-[26px]" />
              )}
              <p className="font-sans text-[14px] text-white">{fileName}</p>
            </>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            onClick={() => toggleComponent("share")}
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
            }}
            className="md:flex gap-2 cursor-pointer w-[139px] h-[42px] rounded-[12px] border borderImage items-center justify-center hidden"
          >
            <Invite />
            <p className="text-[14px] text-[white]">Invite Friends</p>
          </div>
          <div className="w-[47px] h-[42px] bg-[#F8FAFC] rounded-[12px] border border-[#BFBFBF57] md:flex items-center justify-center hidden">
            <Print />
          </div>
          <div className="w-[37px] h-[33px] md:w-[47px] md:h-[42px] bg-[#F8FAFC] rounded-[8px] md:rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
            <Download className={"w-5 h-5"} />
          </div>
          <div className="w-[37px] h-[33px] md:w-[47px] md:h-[42px] bg-[#F8FAFC] rounded-[8px] md:rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
            <img src="/setting.svg" />
          </div>
          <div className="w-[37px] h-[33px] md:w-[47px] md:h-[42px] bg-[#F8FAFC] rounded-[8px] md:rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
            <SixDots />
          </div>
          <div className="relative ">
            <div
              onClick={() => setIsAccountOpen((prev) => !prev)}
              className="flex items-center cursor-pointer gap-2 md:bg-[#F8FAFC] md:border border-[#BFBFBF57] md:p-2 h-[42px] rounded-[12px]"
            >
              <div className=" h-[35px] w-[35px] rounded-full cursor-pointer  overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  className="w-full h-full object-cover "
                />
              </div>
              <span className="md:flex items-center justify-center gap-1 hidden">
                <p className="text-[#40566D] text-[12px] font-[600] font-sans text-right leading-[18px]">
                  Kevin
                </p>
                <Arrow color="#1E1E1E" />
              </span>
            </div>
            {isAccountOpen && (
              <Account
                className={
                  "left-[-220px] md:left-[-230px] top-[42px] md:top-[50px]"
                }
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[9vh] min-h-[50px] px-4 py-2 md:hidden flex items-center justify-between">
        <span className="flex items-center gap-2">
          <img src="/rich.png" alt="" className="w-[26px] h-[26px]" />
          <p className="font-sans text-[14px] text-black">NeuroDocs</p>
        </span>
        <div className="flex items-center gap-4">
          <p className="text-black border-b-2 border-black text-[14px]  ">
            Text
          </p>
          <button
            onClick={() => toggleComponent("share")}
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
            }}
            className="w-[45px] h-[42px] rounded-[12px] border flex items-center justify-center"
          >
            <Invite className={"w-7 h-6"} />
          </button>
        </div>
      </div>
      {fileType === "excel" && (
        <ExcelSheet fileUrl={fileUrl} fileName={fileName} />
      )}
      {/* {Type === 'excel' && <ExcelSheet fileUrl={fileUrl} fileName={fileName} />} */}
      {fileType === "word" && <Word fileUrl={fileUrl} fileName={fileName} />}
      {/* {Type === 'word' && <Word fileUrl={fileUrl} fileName={fileName} />} */}
      {fileType === "pdf" && <PDF fileUrl={fileUrl} fileName={fileName} />}
      {/* {Type === 'pdf' && <PDF fileUrl={fileUrl} fileName={fileName} />} */}
    </div>
  );
}

export default TextFile;
