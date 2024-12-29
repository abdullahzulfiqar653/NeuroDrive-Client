import Account from "../Components/Account";
import { useEffect, useRef, useState } from "react";
import {
  Add,
  Arrow,
  Blocks,
  Cross,
  Folder,
  IconsProps,
  Invite,
  Line,
  SixDots,
  Trash,
} from "../assets/Icons";
import FilesList from "../Components/FilesList";
import { useAuth } from "../AuthContext";

function Home() {
  const { isAccountOpen, setIsAccountOpen , toggleComponent} = useAuth();
  const [isLeftBar, setLeftBar] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setLeftBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex w-[100vw] relative bg-[#f6f8fc] h-screen overflow-x-hidden">
        {/* left side bar  */}
        <div className="bg-[#F1F5FA] rounded-br-2xl rounded-tr-2xl overflow-hidden flex-[0.2] min-h-[800px] h-[100vh] desktop-view-table hidden md:flex flex-col justify-between">
          <LeftBar />
        </div>
        {/* content main  */}
        <div className="desktop-view-table hidden md:flex flex-col flex-[0.8] items-center h-full overflow-auto py-3 ">
          {/* starting bar  */}
          <div className="w-[96%] h-[10%] min-h-[68px] py-4 mb-3 px-3  bg-white rounded-[12px] flex justify-between items-center">
            <p className="text-[14px] mr-2">All Files</p>
            <div className="relative flex-1 hidden md:block">
              <Search />
              <input
                className="font-sans min-w-[300px] max-w-[400px] h-[36px] pl-9 pr-3 rounded-[4px] outline-none bg-[#6C849D1F]  placeholder:text-[#6C849D52] text-[#6c849d] text-[12px] "
                placeholder="Search messages"
              />
            </div>
            <div className="flex gap-4 items-center">
              <div
                onClick={()=>toggleComponent('share')}
                style={{
                  background:
                    "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                  borderImageSource:
                    "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
                }}
                className="flex gap-2 cursor-pointer w-[139px] h-[42px] rounded-[12px] border borderImage items-center justify-center"
              >
                <Invite />
                <p className="text-[14px] text-[white]">Invite Friends</p>
              </div>

              <div className="w-[47px] h-[42px] bg-[#F8FAFC] rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
                <SixDots />
              </div>

              <div className="relative ">
                <div
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  className="flex items-center cursor-pointer gap-2 bg-[#F8FAFC] border border-[#BFBFBF57] p-2 h-[42px] rounded-[12px]"
                >
                  <div className=" h-[35px] w-[35px] rounded-full cursor-pointer  overflow-hidden">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/5298/20ef/398885b3c44f2931c974eeab97452589?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gN2NdKafXBlh4NOklHHV1eMk5pPgM~xzInElAs6jU43hBLK1ZqyuFdVoaaAzSzJT35DEQIT702OG~38L5UL9QTt8vQPXaNa3OeRLdVgCdTCbbG6Mkiu~nrG3CdZjQllT4cZvq~pEPeHhdwKuBLJ~dWRP1X~mbGHgXTVIkyXyBkY1XEz8VBFmqnP6cQ7Pg1fl96tzu2PFVIET7I10KKdq3ddZFMFYLrrJcy6nXs8OCNl2qjz5NQt0F9~A6BtdCmPsne-a~xpOt6pJCzsBPz9VmItNEdCfyO17bdhhUQmLiwttWqiveWZ1YFLf4bHEXmjuWO0mhvKQ063l5E0G-YZL6Q__"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <span className="flex items-center justify-center gap-1">
                    <p className="text-[#40566D] text-[12px] font-[600] font-sans text-right leading-[18px]">
                      Kevin
                    </p>
                    <Arrow color="#1E1E1E" />
                  </span>
                </div>
                {isAccountOpen && <Account className={"left-[-160px] md:left-[-230px] top-[42px] md:top-[50px]"}/>}
              </div>
            </div>
          </div>
          <FilesList />
        </div>

        <div className="mobile-view-table w-full flex flex-col items-center mt-3 md:hidden">
          <div className="flex justify-between items-center pl-4 pr-2 w-[92vw] min-h-[49px] mb-4 rounded-[14px] bg-[white] ">
            <div className="flex items-center">
              <span onClick={() => setLeftBar((prev) => !prev)}>
                <img src="/bar.svg" />
              </span>
            </div>
            <img src="/logo.svg" alt="" className="w-8 h-8" />
            <div className="flex items-center relative gap-3">
              <span className="left-[-50px] absolute">
                <Search className={"w-6 h-6"} />
              </span>
              <div className="w-[37px] h-[33px] md:w-[47px] md:h-[42px] bg-[#F8FAFC] rounded-[8px] md:rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
                <SixDots />
              </div>
              <div
                onClick={() => setIsAccountOpen((prev) => !prev)}
                className=" h-[35px] w-[35px] rounded-full cursor-pointer overflow-hidden"
              >
                <img
                  src="https://s3-alpha-sig.figma.com/img/5298/20ef/398885b3c44f2931c974eeab97452589?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gN2NdKafXBlh4NOklHHV1eMk5pPgM~xzInElAs6jU43hBLK1ZqyuFdVoaaAzSzJT35DEQIT702OG~38L5UL9QTt8vQPXaNa3OeRLdVgCdTCbbG6Mkiu~nrG3CdZjQllT4cZvq~pEPeHhdwKuBLJ~dWRP1X~mbGHgXTVIkyXyBkY1XEz8VBFmqnP6cQ7Pg1fl96tzu2PFVIET7I10KKdq3ddZFMFYLrrJcy6nXs8OCNl2qjz5NQt0F9~A6BtdCmPsne-a~xpOt6pJCzsBPz9VmItNEdCfyO17bdhhUQmLiwttWqiveWZ1YFLf4bHEXmjuWO0mhvKQ063l5E0G-YZL6Q__"
                  className="w-full h-full object-cover "
                />
                {isAccountOpen && <Account className={"left-[-160px] md:left-[-230px] top-[42px] md:top-[50px]"}/>}
              </div>
            </div>
          </div>
          <FilesList />
        </div>

        {isLeftBar && (
          <section className="fixed inset-0 md:hidden flex justify-start items-center bg-[#00000091] md:bg-[#F8FAFC] z-50 px-0 ">
            <section
              className={`relative w-[75vw] pt-3 h-[100vh] items-start bg-[#F8FAFC] overflow-hidden Mobile-view-table flex flex-col justify-between navbar ${
                isLeftBar ? "open" : "closed"
              }`}
            >
              <span
                className="absolute right-[17px] text-lg top-[17px] cursor-pointer"
                onClick={() => setLeftBar((prev) => !prev)}
              >
                <Cross className={"h-[14px] w-[14px]"} />
              </span>
              <LeftBar setLeftBar={setLeftBar} />
            </section>
          </section>
        )}

        
      </div>
    </>
  );
}

export default Home;

type LeftBarProps = {
  setLeftBar?: React.Dispatch<React.SetStateAction<boolean>>;
};
function LeftBar({ setLeftBar }: LeftBarProps) {
   const {toggleComponent}=useAuth();
  return (
    <>
      <div className="flex flex-col justify-center items-start px-2 pt-4 gap-3 w-full">
        <img
          src="/logoName.svg"
          className="w-[150px] mb-1 md:mb-0 md:pl-1 pl-5"
        />
        {/* <Line className={"my-1 md:hidden block"} /> */}
        <div className="flex flex-col gap-2 md:pl-1 pl-5 mt-3">
          <div className="cursor-pointer bg-[#3984FF] w-[224px] pl-2 pr-1 h-[36px] rounded-[12px] flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <Blocks />
              <p className="text-[14px] font-sans text-white leading-[20px]">
                All Files
              </p>
            </div>
          </div>
          <div className="cursor-pointer hover:bg-[#3984FF] hover:text-white w-[224px] pl-2 pr-1 h-[36px] rounded-[12px] flex justify-between items-center hover:shadow-md">
            <div className="flex items-center gap-3">
              <img src="/shared.svg" />
              <p className="text-[14px] font-sans  leading-[20px]">Shared</p>
            </div>
          </div>
          <div className="cursor-pointer hover:bg-[#3984FF] hover:text-white w-[224px] pl-2 pr-1 h-[36px] rounded-[12px] flex justify-between items-center hover:shadow-md">
            <div className="flex items-center gap-3">
              <Trash />
              <p className="text-[14px] font-sans  leading-[20px]">
                Deleted Files
              </p>
            </div>
          </div>
          <div className="cursor-pointer hover:bg-[#3984FF] hover:text-white w-[224px] pl-2 pr-1 h-[36px] rounded-[12px] flex justify-between items-center hover:shadow-md">
            <div className="flex items-center gap-3">
              <img src="/setting.svg" />
              <p className="text-[14px] font-sans  leading-[20px]">Settings</p>
            </div>
          </div>
        </div>
        <Line className={"mt-2 min-w-[230px] w-full"} />
      </div>
      <div className="flex flex-col items-center gap-2 my-2 h-[30vh] min-h-[280px] overflow-auto">
        <div className="flex items-center justify-between w-full px-2 pb-2">
          <h1 className="flex text-[14px] text-[#9F9F9F] gap-1 items-center">
            <span>
              <Arrow color="#9F9F9F" />
            </span>
            FOLDERS
          </h1>
          <span onClick={() => toggleComponent("newFolder")}>
            <Add />
          </span>
        </div>
        <div className="flex items-center justify-start  cursor-pointer hover:shadow-lg rounded-xl py-1  gap-3 w-[90%] font-sans px-3">
          <Folder />
          <p className="">Workspace</p>
        </div>
        <div className="flex items-center justify-start  cursor-pointer hover:shadow-lg rounded-xl py-1  gap-3 w-[90%] font-sans px-3">
          <Folder />
          <p>Desk setup</p>
        </div>
        <div className="flex items-center justify-start  cursor-pointer hover:shadow-lg rounded-xl py-1  gap-3 w-[90%] font-sans px-3">
          <Folder />
          <p>Content corner</p>
        </div>
        <div className="flex items-center justify-start  cursor-pointer hover:shadow-lg rounded-xl py-1  gap-3 w-[90%] font-sans px-3">
          <Folder />
          <p>Artistic assets</p>
        </div>
        <div className="flex items-center justify-start  cursor-pointer hover:shadow-lg rounded-xl py-1  gap-3 w-[90%] font-sans px-3">
          <Folder />
          <p>Office work</p>
        </div>
        <div className="flex items-center justify-start  cursor-pointer hover:shadow-lg rounded-xl py-1  gap-3 w-[90%] font-sans px-3">
          <Folder />
          <p>Home setup</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div
          onClick={() => {
            setLeftBar?.((prev) => !prev);
          }}
          className="text-[#40566D] text-[14px] pl-4 pr-4 flex font-sans justify-between md:hidden items-start w-full"
        >
          {/* <span className="flex items-center  gap-2">
            <MobileWallet />
            My Wallets
          </span> */}
          <Arrow className={"w-[8px] h-[22px]"} />
        </div>
        <div
          style={{
            background: "linear-gradient(180deg, #1D203E 0%, #4D55A4 130.53%)",
          }}
          className="w-[75vw]  md:w-full py-2 text-[#FFFFFF] rounded-tr-2xl rounded-tl-2xl flex flex-col justify-center items-center"
        >
          <div className="flex justify-between w-[90%]">
            <p className="text-[16px] font-[600]">Available Space</p>
            <p className="text-[16px]">30%</p>
          </div>
          <p className="text-[#FFFFFF80] text-[10px] text-start w-[90%]">
            Expire on: 12.12.24
          </p>
          <img src="progressbar.svg" />
          <div
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
            }}
            className="flex justify-center items-center mt-2 w-[90%] text-[white] text-[14px] rounded-xl h-[39px]"
          >
            ⚡️ Buy more space
          </div>
        </div>
      </div>
    </>
  );
}

const Search = ({ className }: IconsProps) => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} absolute top-[50%] left-[13px] translate-y-[-50%]`}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.0781 14.0214C10.0517 14.8425 8.74968 15.3335 7.33301 15.3335C4.0193 15.3335 1.33301 12.6472 1.33301 9.3335C1.33301 6.01979 4.0193 3.3335 7.33301 3.3335C10.6467 3.3335 13.333 6.01979 13.333 9.3335C13.333 10.7502 12.842 12.0522 12.0209 13.0786L14.4711 15.5288C14.7314 15.7891 14.7314 16.2112 14.4711 16.4716C14.2107 16.7319 13.7886 16.7319 13.5283 16.4716L11.0781 14.0214ZM2.66634 9.3335C2.66634 6.75617 4.75568 4.66683 7.33301 4.66683C9.91034 4.66683 11.9997 6.75617 11.9997 9.3335C11.9997 10.5908 11.5024 11.732 10.6939 12.5711C10.6711 12.5887 10.6492 12.6079 10.6283 12.6288C10.6074 12.6497 10.5882 12.6716 10.5706 12.6944C9.7315 13.5029 8.59032 14.0002 7.33301 14.0002C4.75568 14.0002 2.66634 11.9108 2.66634 9.3335Z"
      fill="#40566D"
    />
  </svg>
);
