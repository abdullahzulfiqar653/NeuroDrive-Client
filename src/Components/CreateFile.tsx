import { Cross } from "../assets/Icons"

function CreateFile() {
  return (
    <>
     <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
          <div className="w-[95vw] h-[60vh] gap-4 relative max-w-[351px] max-h-[366px] md:min-w-[493px] md:min-h-[463px] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
            <span
              className="absolute right-[17px] top-[17px] cursor-pointer"
            >
              <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
            </span>    
            <p className="text-[22px] text-[#202343]">
            Upload document
            </p>
            <div className="flex flex-col items-start w-full justify-start text-[12px] md:text-[14px] text-[black]">
              <div className="h-[36px] w-[97%] border-[0.66px] border-[#3E85FF] md:h-[54px] bg-[#ECECEC] rounded-md px-3">
                <input
                  type="text"
                  placeholder="Workspace"
                  className="w-full h-full outline-none text-[12px] font-sans font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-[black]"
                />
              </div>
            </div>
            <button
              style={{
                background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                borderImageSource:
                  "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
              }}
              className="w-[132px] h-[34px] md:w-[163px] md:h-[42px] rounded-xl text-white font-sans text-[13px] mt-3 md:mt-5"
            >
              done
            </button>
          </div>
        </div>
    </>
  )
}

export default CreateFile