function RegisterSeeds() {
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
              <span className="text-blue-600">Login here</span>
            </p>
          </div>

          <div className="relative">
            <div className="w-[38vw] min-h-[172px] px-2.5 pb-2.5 pt-4 border border-[#BABABA] rounded-lg">
              <label
                htmlFor="key"
                className="absolute text-lg font-sans text-black dark:text-gray-400  transform -translate-y-4 ml-2 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2  start-1"
              >
                key Seed
              </label>
            </div>
            <div className="flex font-sans gap-4 mt-2 justify-between text-[16px] w-full items-center">
                <p className="text-[#BABABACC] ">Please write these down incase you lose your seed.</p>
                <p className="text-[#000000A1] flex gap-2 items-center"><img src="/save.svg" alt="" className="w-8 h-8"/>Save</p>
                <p className="text-[#000000A1] flex gap-2 items-center"><img src="/copy.svg" alt="" className="w-6 h-6"/>Copy</p>
            </div>
          </div>
          <button
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
            }}
            className="w-[202px] h-[48px] text-white hover:shadow-lg shadow-black border-[1.16px] rounded-[13px] text-[15px] font-sans text-center"
          >
            Next
          </button>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(155.35deg, #3984FF -4.35%, #6860FE 32.93%, #8C44FD 62.55%, #B325FC 94.21%)",
          // backgroundImage: `url('/login-bg.svg')`,
          backgroundSize: "cover", // Makes the image cover the entire area
          backgroundPosition: "center", // Ensures the image is centered
          backgroundRepeat: "no-repeat", // Prevents tiling
          height: "100vh", // Makes the height 100% of the viewport
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
