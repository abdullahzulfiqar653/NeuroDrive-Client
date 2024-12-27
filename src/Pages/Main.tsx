import { Link } from "react-router-dom";
import Account from "../Components/Account";
import { useEffect, useRef, useState } from "react";
import {
  Add,
  Arrow,
  Blocks,
  Cross,
  Folder,
  IconsProps,
  Line,
  Trash,
} from "../assets/Icons";
import FilesList from "../Components/FilesList";

function Main() {
  const [isProfile, setProfile] = useState(false);
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
      <div className="flex w-[100vw] bg-[#f6f8fc] h-screen">
        {/* left side bar  */}
        <div className="bg-[#F1F5FA] rounded-br-2xl rounded-tr-2xl overflow-hidden flex-[0.2] min-h-[800px] h-[100vh] desktop-view-table hidden md:flex flex-col justify-between">
          <LeftBar />
        </div>
        {/* content main  */}
        <div className="desktop-view-table hidden md:flex flex-col flex-[0.8] items-center max-h-[938px] overflow-auto py-3 ">
          {/* starting bar  */}
          <div className="w-[96%] h-[68px] py-4 mb-3 px-3 bg-white rounded-[12px] flex justify-between items-center">
            <p className="text-[14px] mr-2">All Files</p>
            <div className="relative flex-1 hidden md:block">
              <Search />
              <input
                className="font-sans w-[400px] h-[36px] pl-9 pr-3 rounded-[4px] outline-none bg-[#6C849D1F]  placeholder:text-[#6C849D52] text-[#6c849d] text-[12px] "
                placeholder="Search messages"
              />
            </div>
            <div className="flex gap-4 items-center">
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                  borderImageSource:
                    "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
                }}
                className="flex gap-2 w-[139px] h-[42px] rounded-[12px] border borderImage items-center justify-center"
              >
                <Invite />
                <p className="text-[14px] text-[white]">Invite Friends</p>
              </div>
              <div className="w-[47px] h-[42px] bg-[#F8FAFC] rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
                <SixDots />
              </div>

              <div
                onClick={() => setProfile((prev) => !prev)}
                className="relative flex items-center gap-2 bg-[#F8FAFC] border border-[#BFBFBF57] p-2 h-[42px] rounded-[12px]"
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
                {isProfile && <Account setProfile={setProfile} />}
              </div>
            </div>
          </div>
          <FilesList />
        </div>
        <div className="mobile-view-table w-full flex flex-col items-center mt-3 md:hidden">
          <div className="flex justify-between items-center pl-4 pr-2 w-[92vw] h-[49px] mb-4 rounded-[99px] bg-[white] ">
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
              <div className="w-[40px] h-[35px] bg-[#F8FAFC] rounded-[12px] border border-[#BFBFBF57] flex items-center justify-center">
                <SixDots />
              </div>
              <div
                onClick={() => setProfile((prev) => !prev)}
                className=" h-[35px] w-[35px] rounded-full cursor-pointer overflow-hidden"
              >
                <img
                  src="https://s3-alpha-sig.figma.com/img/5298/20ef/398885b3c44f2931c974eeab97452589?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gN2NdKafXBlh4NOklHHV1eMk5pPgM~xzInElAs6jU43hBLK1ZqyuFdVoaaAzSzJT35DEQIT702OG~38L5UL9QTt8vQPXaNa3OeRLdVgCdTCbbG6Mkiu~nrG3CdZjQllT4cZvq~pEPeHhdwKuBLJ~dWRP1X~mbGHgXTVIkyXyBkY1XEz8VBFmqnP6cQ7Pg1fl96tzu2PFVIET7I10KKdq3ddZFMFYLrrJcy6nXs8OCNl2qjz5NQt0F9~A6BtdCmPsne-a~xpOt6pJCzsBPz9VmItNEdCfyO17bdhhUQmLiwttWqiveWZ1YFLf4bHEXmjuWO0mhvKQ063l5E0G-YZL6Q__"
                  className="w-full h-full object-cover "
                />
                {isProfile && <Account setProfile={setProfile} />}
              </div>
            </div>
          </div>
          {/* <EmailList /> */}
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

export default Main;

type LeftBarProps = {
  setLeftBar?: React.Dispatch<React.SetStateAction<boolean>>;
};
function LeftBar({ setLeftBar }: LeftBarProps) {
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
          <span>
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

const SixDots = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3.08686C9.2767 3.08686 9.54206 2.97692 9.73771 2.78124C9.93336 2.58556 10.0433 2.32016 10.0433 2.04343C10.0433 1.76669 9.93336 1.50129 9.73771 1.30561C9.54206 1.10993 9.2767 1 9 1C8.72331 1 8.45794 1.10993 8.26229 1.30561C8.06664 1.50129 7.95672 1.76669 7.95672 2.04343C7.95672 2.32016 8.06664 2.58556 8.26229 2.78124C8.45794 2.97692 8.72331 3.08686 9 3.08686ZM15.9567 3.08686C16.0937 3.08686 16.2294 3.05987 16.356 3.00743C16.4825 2.95499 16.5976 2.87814 16.6944 2.78124C16.7913 2.68435 16.8682 2.56933 16.9206 2.44273C16.973 2.31614 17 2.18045 17 2.04343C17 1.9064 16.973 1.77072 16.9206 1.64413C16.8682 1.51753 16.7913 1.4025 16.6944 1.30561C16.5976 1.20872 16.4825 1.13186 16.356 1.07943C16.2294 1.02699 16.0937 1 15.9567 1C15.68 1 15.4147 1.10993 15.219 1.30561C15.0234 1.50129 14.9134 1.76669 14.9134 2.04343C14.9134 2.32016 15.0234 2.58556 15.219 2.78124C15.4147 2.97692 15.68 3.08686 15.9567 3.08686ZM2.04328 3.08686C2.18029 3.08686 2.31595 3.05987 2.44253 3.00743C2.5691 2.95499 2.68411 2.87814 2.78099 2.78124C2.87787 2.68435 2.95471 2.56933 3.00714 2.44273C3.05957 2.31614 3.08656 2.18045 3.08656 2.04343C3.08656 1.9064 3.05957 1.77072 3.00714 1.64413C2.95471 1.51753 2.87787 1.4025 2.78099 1.30561C2.68411 1.20872 2.5691 1.13186 2.44253 1.07943C2.31595 1.02699 2.18029 1 2.04328 1C1.76658 1 1.50122 1.10993 1.30557 1.30561C1.10992 1.50129 1 1.76669 1 2.04343C1 2.32016 1.10992 2.58556 1.30557 2.78124C1.50122 2.97692 1.76658 3.08686 2.04328 3.08686ZM9 10.0434C9.2767 10.0434 9.54206 9.9335 9.73771 9.73782C9.93336 9.54214 10.0433 9.27673 10.0433 9C10.0433 8.72327 9.93336 8.45787 9.73771 8.26218C9.54206 8.0665 9.2767 7.95657 9 7.95657C8.72331 7.95657 8.45794 8.0665 8.26229 8.26218C8.06664 8.45787 7.95672 8.72327 7.95672 9C7.95672 9.27673 8.06664 9.54214 8.26229 9.73782C8.45794 9.9335 8.72331 10.0434 9 10.0434ZM15.9567 10.0434C16.2334 10.0434 16.4988 9.9335 16.6944 9.73782C16.8901 9.54214 17 9.27673 17 9C17 8.72327 16.8901 8.45787 16.6944 8.26218C16.4988 8.0665 16.2334 7.95657 15.9567 7.95657C15.68 7.95657 15.4147 8.0665 15.219 8.26218C15.0234 8.45787 14.9134 8.72327 14.9134 9C14.9134 9.27673 15.0234 9.54214 15.219 9.73782C15.4147 9.9335 15.68 10.0434 15.9567 10.0434ZM2.04328 10.0434C2.31997 10.0434 2.58534 9.9335 2.78099 9.73782C2.97664 9.54214 3.08656 9.27673 3.08656 9C3.08656 8.72327 2.97664 8.45787 2.78099 8.26218C2.58534 8.0665 2.31997 7.95657 2.04328 7.95657C1.76658 7.95657 1.50122 8.0665 1.30557 8.26218C1.10992 8.45787 1 8.72327 1 9C1 9.27673 1.10992 9.54214 1.30557 9.73782C1.50122 9.9335 1.76658 10.0434 2.04328 10.0434ZM9 17C9.2767 17 9.54206 16.8901 9.73771 16.6944C9.93336 16.4987 10.0433 16.2333 10.0433 15.9566C10.0433 15.6798 9.93336 15.4144 9.73771 15.2188C9.54206 15.0231 9.2767 14.9131 9 14.9131C8.72331 14.9131 8.45794 15.0231 8.26229 15.2188C8.06664 15.4144 7.95672 15.6798 7.95672 15.9566C7.95672 16.2333 8.06664 16.4987 8.26229 16.6944C8.45794 16.8901 8.72331 17 9 17ZM15.9567 17C16.2334 17 16.4988 16.8901 16.6944 16.6944C16.8901 16.4987 17 16.2333 17 15.9566C17 15.6798 16.8901 15.4144 16.6944 15.2188C16.4988 15.0231 16.2334 14.9131 15.9567 14.9131C15.68 14.9131 15.4147 15.0231 15.219 15.2188C15.0234 15.4144 14.9134 15.6798 14.9134 15.9566C14.9134 16.2333 15.0234 16.4987 15.219 16.6944C15.4147 16.8901 15.68 17 15.9567 17ZM2.04328 17C2.31997 17 2.58534 16.8901 2.78099 16.6944C2.97664 16.4987 3.08656 16.2333 3.08656 15.9566C3.08656 15.6798 2.97664 15.4144 2.78099 15.2188C2.58534 15.0231 2.31997 14.9131 2.04328 14.9131C1.76658 14.9131 1.50122 15.0231 1.30557 15.2188C1.10992 15.4144 1 15.6798 1 15.9566C1 16.2333 1.10992 16.4987 1.30557 16.6944C1.50122 16.8901 1.76658 17 2.04328 17Z"
      stroke="black"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Invite = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4599 13.73C13.0118 13.73 14.2699 12.4719 14.2699 10.92C14.2699 9.36806 13.0118 8.10999 11.4599 8.10999C9.90798 8.10999 8.6499 9.36806 8.6499 10.92C8.6499 12.4719 9.90798 13.73 11.4599 13.73Z"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.65 20.2C16.65 17.87 14.33 15.97 11.46 15.97C8.59002 15.97 6.27002 17.86 6.27002 20.2"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 12.5C21 17.75 16.75 22 11.5 22C6.25 22 2 17.75 2 12.5C2 7.25 6.25 3 11.5 3C12.81 3 14.06 3.25999 15.2 3.73999C15.07 4.13999 15 4.56 15 5C15 5.75 15.21 6.46 15.58 7.06C15.78 7.4 16.04 7.70997 16.34 7.96997C17.04 8.60997 17.97 9 19 9C19.44 9 19.86 8.92998 20.25 8.78998C20.73 9.92998 21 11.19 21 12.5Z"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23 5C23 5.32 22.96 5.62999 22.88 5.92999C22.79 6.32999 22.63 6.72 22.42 7.06C21.94 7.87 21.17 8.49998 20.25 8.78998C19.86 8.92998 19.44 9 19 9C17.97 9 17.04 8.60997 16.34 7.96997C16.04 7.70997 15.78 7.4 15.58 7.06C15.21 6.46 15 5.75 15 5C15 4.56 15.07 4.13999 15.2 3.73999C15.39 3.15999 15.71 2.64002 16.13 2.21002C16.86 1.46002 17.88 1 19 1C20.18 1 21.25 1.51002 21.97 2.33002C22.61 3.04002 23 3.98 23 5Z"
      stroke="white"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.49 4.97998H17.51"
      stroke="white"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19 3.52002V6.51001"
      stroke="white"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

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
