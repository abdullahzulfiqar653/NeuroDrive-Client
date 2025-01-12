import { Arrow, CopyLink, Cross, Resonance, Share } from "../assets/Icons";
import { useAuth } from "../AuthContext";

function ShareFile() {
    const {toggleComponent}= useAuth();
  return (
    <div className="fixed inset-0 bg-[#000000BA] z-50 flex items-center justify-center">
      <div className="relative w-[95vw] max-w-[351px] md:w-[40vw] md:min-w-[493px] h-[60vh] md:h-[65vh]   md:min-h-[514px] px-3 md:px-6 flex flex-col items-center justify-center rounded-xl bg-[#F3F3F3]">
        <span onClick={()=>toggleComponent('share')} className="absolute right-[17px] top-[17px]  cursor-pointer">
          <Cross className={"w-[11px] h-[11px] md:w-4 md:h-4"} color={"#3C3C4399"} />
        </span>
        <div className="flex justify-between w-full mt-7">
          <p className="text-[16px] md:text-[22px] text-[#202343]">Share this file</p>
          <p className="text-[12px] md:text-[14px] text-[#0982FD] font-sans flex gap-2 cursor-pointer">
            <CopyLink />
            Copy link
          </p>
        </div>
        <div className="w-full h-[37px] md:h-[54px] rounded-[4px] md:rounded-md border flex items-center  px-4 border-[#3984FF]">
            <input
              type="text"
              placeholder="Invite others by email"
              className="text-[10px] md:text-[14px] text-black outline-none placeholder:text-black bg-[#ffffff00] font-sans"
            />
          </div>
        <div className="flex w-full my-1 md:my-2 gap-2 items-center justify-between">
          <div className="w-full h-[37px]  md:h-[54px] rounded-[4px] md:rounded-md border flex items-center  px-4 border-[#0000004D]">
            <input
              type="text"
              placeholder="Enter IP addrese"
              className="text-[10px] md:text-[14px] text-black outline-none placeholder:text-[#0000004D] bg-[#ffffff00] font-sans"
            />
          </div>
          <button
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
            }}
            className="w-[57px] h-[37px] md:min-w-[91px] md:h-[53px] hover:shadow-lg rounded-xl border text-white font-sans text-[10px] md:text-[14px]"
          >
            Invite
          </button>
        </div>
        <div className="flex w-full mt-2 items-center bg-white hover:shadow-lg cursor-pointer p-1 px-2 rounded-md justify-between">
          <p className="text-[11px] md:text-[14px] text-black flex items-center gap-2">
            <Resonance className={"w-[32px] h-[32px] md:w-[46px] md:h-[46px]"}/>
            Share on Resonance
          </p>
          <span className="pr-2">
            <Share className={"w-[11px] h-[12px] md:w-[16px] md:h-[18px]"}/>
          </span>
        </div>
        <p className="text-[12px] md:text-[14px] text-[#0000004D] w-full text-start mt-2 md:mt-4 ml-1">
          WHO HAS ACCESS
        </p>
        <div className="flex w-full mt-2 items-center p-1 px-2 justify-between font-sans text-black">
          <p className="text-[12px] md:text-[14px] flex items-center gap-1">
            <img src="/img1.png" alt="" className="md:w-full md:h-full h-9 w-9"/>
            Aqsa<span className="text-[#00000066]">(You)</span>
          </p>
          <p className="text-[10px] md:text-[14px] ">Owner</p>
        </div>
        <div className="flex w-full mt-1 items-center p-1 px-2 justify-between font-sans text-black">
          <p className="text-[14px] flex items-center gap-1">
            <img src="/img1.png" alt="" className="md:w-full md:h-full h-9 w-9"/>
            Kevin<span className="text-[#00000066]">(You)</span>
          </p>
          <p className="text-[10px] md:text-[14px]  flex items-center gap-2 cursor-pointer">Can View<Arrow color="#1E1E1E" /></p>
        </div>
        <div className="flex w-full mt-1 items-center p-1 px-2 justify-between font-sans text-black">
          <p className="text-[12px] md:text-[14px]  flex items-center gap-1">
            <img src="/img1.png" alt="" className="md:w-full md:h-full h-9 w-9"/>
            Alexandar<span className="text-[#00000066]">(You)</span>
          </p>
          <p className="text-[10px] md:text-[14px]  flex items-center gap-2 cursor-pointer">Can View<Arrow color="#1E1E1E" /></p>
        </div>
      </div>
    </div>
  );
}

export default ShareFile;


