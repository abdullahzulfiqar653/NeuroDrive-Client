import { useNavigate } from "react-router-dom";

interface RegisterInfoProps {
  setAcknowledged: (value: boolean) => void;
}

function RegisterInfo({ setAcknowledged }: RegisterInfoProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white flex md:flex-row flex-col w-full h-[100vh] justify-between">
      <div className="absolute hidden lg:flex items-center justify-center -left-[9vw] right-0 top-[8vh]">
        <p className="text-[14px] font-sans">
          Need Help?{" "}
          <p className="text-[#d8d8d8] whitespace-nowrap">Ask any question</p>
        </p>
        <img src="/img2.png" alt="" className="w-20 h-20" />
      </div>

      <div className="flex flex-col w-[100vw] md:w-[40vw] p-4">
        <span className="flex gap-2 md:pr-7 items-center justify-center md:mr-[200px] lg:mr-[400px] mt-[2px] md:border-r border-white">

          <img src="/logo.svg" alt="" className="w-7 h-6" />
          <p className="font-chakra text-[16px] md:text-[22px] text-black">
            NeuroDrive
          </p>
        </span>

        <div className="flex flex-col items-center justify-center h-full w-full gap-3">
          <div className="flex flex-col items-center gap-1 mt-[70px] mb-6 text-center">
            <h1 className="text-[#202343] text-[20px] lg:text-[48px]  md:text-[38px]  font-bold">
              Register Account
            </h1>
            <p className="text-[#000000] text-[12px] lg:text-[18px]  md:text-[16px] font-sans">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>

          <div className="font-sans w-full md:w-[35vw] flex flex-col  items-center  text-center px-2 md:px-0">
            <p className="text-[16px] md:text-[14px] lg:text-[18px] font-[400]">
              Important Note :
            </p>
            <p className="text-[#000000B2] text-[12px] lg:text-[16px] md:text-[16px] leading-relaxed">
              On the next page, you will see a series of 16 words. This is your
              unique and private seed and it is the ONLY way to recover your
              wallet in case of loss. It is your responsibility to write it down
              and store it safely outside of the password manager app.
            </p>
          </div>

          <button
            onClick={() => setAcknowledged(true)}
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
            }}
            className="w-[240px] lg:w-[319px] md:w-[319px] h-[48px] text-white hover:shadow-lg shadow-black border-[1.16px] rounded-[13px] text-[12px] lg:text-[15.08px] font-sans mt-4 px-4 md:px-0"
          >
            I understand, show me my seed
          </button>
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(155.35deg, #3984FF -4.35%, #6860FE 32.93%, #8C44FD 62.55%, #B325FC 94.21%)",
          height: "100vh",
        }}
        className="rounded-[22px] w-full h-[50vh]  md:w-[50%] overflow-hidden "
      >
        <img
          src="/regis-bg.svg"
          alt=""
          className="w-full h-full object-cover md:block"
        />
  <img
          src="/regis-mob.svg"
          alt=""
          className="w-full h-full object-cover block md:hidden"
        />

      </div>
    </div>
  );
}

export default RegisterInfo;
