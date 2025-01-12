import { useState } from "react";
import {
  Add,
  Box,
  List,
  Xcel,
  Copy,
  Trash,
  Circle,
  Recent,
  Rename,
  Filter,
  Gallery,
  Starred,
  Download,
  NoPerson,
  ThreeDots,
  ShortRich,
  ShortXcel,
} from "../assets/Icons";
import Popup from "reactjs-popup";
import { useAuth } from "../AuthContext";

function FilesList() {
  const [isOpen, seIsOpen] = useState(false);
  const { toggleComponent } = useAuth();
  const [radioClick, setRadioClick] = useState(false);
  const data = [
    { PersonName: "", name: "John Doe", size: "3.0 GB" },
    { PersonName: "Roanldo Richards", name: "John Doe", size: "3.0 GB" },
    { PersonName: "Roanldo", name: "Jane Smith", size: "3.0 GB" },
    { PersonName: "Roanldo", name: "Sarah Lee", size: "3.0 GB" },
    { PersonName: "", name: "Sarah Lee", size: "3.0 GB" },
  ];
  return (
    <div className="flex flex-col items-center h-full w-[96%]">
      <div className="flex flex-col items-center gap-4 w-[96%]">
        <div className="flex flex-row items-center justify-between gap-4 w-[96%]">
          <p className="text-[16px] md:text-[22px] text-start w-[96%] my-2">
            Create New Document
          </p>
          <button
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
            }}
            className="w-[79px] h-[31px] rounded-lg flex gap-1 items-center justify-center md:hidden text-white font-sans text-[10px]"
          >
            <Add className={"w-4 h-4 mb-1"} color={"white"} /> Upload
          </button>
        </div>
        <div className="flex gap-4 items-start  justify-start w-[96%]">
          <div
            onClick={() => toggleComponent("newExcel")}
            style={{
              borderImageSource:
                "linear-gradient(180deg, #B325FC 0%, #8C44FD 45%, #6860FE 100%)",
            }}
            className="w-[109px] h-[124px] md:w-[203px] md:h-[231px] rounded-[16px] md:rounded-[32px] bg-[white] overflow-hidden border flex flex-col items-center justify-between"
          >
            <span className="h-[75%] w-full flex justify-center items-center">
              <Xcel className={"w-[32px] h-[41px] md:w-[61px] md:h-[77px]"} />
            </span>
            <p className="h-[25%] text-[12px] md:text-[20px] font-sans w-full flex justify-center items-center object-cover overflow-hidden bg-[#F1F5FA] ">
              Sheets
            </p>
          </div>
          <div
            onClick={() => toggleComponent("newDocs")}
            style={{
              borderImageSource:
                "linear-gradient(180deg, #B325FC 0%, #8C44FD 45%, #6860FE 100%)",
            }}
            className="w-[109px] h-[124px] md:w-[203px] md:h-[231px] rounded-[16px] md:rounded-[32px]  bg-[white] overflow-hidden border flex flex-col items-center justify-between"
          >
            <span className="h-[75%] w-full flex justify-center items-center">
              <img
                src="/rich.png"
                className={"w-[41px] h-[41px] md:w-[77px] md:h-[77px]"}
              />
            </span>
            <p className="h-[25%] text-[12px] md:text-[20px] font-sans  w-full flex justify-center items-center object-cover overflow-hidden bg-[#F1F5FA] ">
              Rich Text
            </p>
          </div>
          <div
            onClick={() => toggleComponent("newFolder")}
            style={{
              borderImageSource:
                "linear-gradient(180deg, #B325FC 0%, #8C44FD 45%, #6860FE 100%)",
            }}
            className="w-[109px] h-[124px] md:w-[203px] md:h-[231px] rounded-[16px] md:rounded-[32px] bg-[white] overflow-hidden border flex flex-col items-center justify-between"
          >
            <span className="h-[75%] w-full flex justify-center items-center">
              <img
                src="/folders.png"
                className={"w-[44px] h-[41px] md:w-[83px] md:h-[77px]"}
              />
            </span>
            <p className="h-[25%] text-[12px] md:text-[20px] font-sans w-full flex justify-center items-center object-cover overflow-hidden bg-[#F1F5FA] ">
              Folder
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 w-[96%]">
        <p className="text-[16px] md:text-[22px] text-start w-[96%]">
          All Files
        </p>
        <div className="flex gap-2 justify-between items-center w-[96%]">
          <div className="flex gap-2 items-start">
            <button className="flex items-center justify-start  pl-2 md:pl-3 gap-1 md:gap-2  w-[69px] h-[27px] md:w-[107px] md:h-[42px] text-[10px] md:text-[12px] bg-white rounded-lg md:rounded-xl font-sans border border-[#BFBFBF57]">
              <Recent /> Recent
            </button>
            <button className="flex items-center justify-start pl-2 md:pl-3 gap-1 md:gap-2 w-[69px] h-[27px] md:w-[107px] md:h-[42px] text-[10px] md:text-[12px] bg-white rounded-lg md:rounded-xl  font-sans border border-[#BFBFBF57]">
              <Starred /> Starred
            </button>
          </div>
          <div className="flex gap-4 items-center">
            {isOpen ? (
              <span className="cursor-pointer" onClick={() => seIsOpen(false)}>
                <Box />{" "}
              </span>
            ) : (
              <span className="cursor-pointer" onClick={() => seIsOpen(true)}>
                <List />
              </span>
            )}
            <button className="flex items-center justify-start pl-2 md:pl-3 gap-1 md:gap-2 w-[69px] h-[27px] md:w-[107px] md:h-[42px] text-[10px] md:text-[12px] bg-white rounded-lg md:rounded-xl font-sans border border-[#BFBFBF57]">
              <Filter /> Filter
            </button>
          </div>
        </div>
        <div className="h-full w-[100%] md:w-[96%]">
          {isOpen ? (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-2 md:my-4">
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col ">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <Xcel
                    className={"w-[32px] h-[41px] md:w-[61px] md:h-[77px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-2">
                    <ShortXcel />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Sheets</span>
                      <span className="text-[#00000069]">xls . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col ">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <img
                    src="/rich.png"
                    className={"w-[40px] h-[40px] md:w-[77px] md:h-[77px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <ShortRich />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Workspace</span>
                      <span className="text-[#00000069]">docs . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <img
                    src="/pic.png"
                    className={"w-[52px] h-[47px] md:w-[99px] md:h-[90px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Gallery className={"w-3 h-3 md:w-4 md:h-4"} />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Butterfly </span>
                      <span className="text-[#00000069]">png . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col ">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <Xcel
                    className={"w-[32px] h-[41px] md:w-[61px] md:h-[77px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <ShortXcel />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Sheets</span>
                      <span className="text-[#00000069]">xls . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>

              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col ">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <Xcel
                    className={"w-[32px] h-[41px] md:w-[61px] md:h-[77px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <ShortXcel />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Sheets</span>
                      <span className="text-[#00000069]">xls . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col ">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <Xcel
                    className={"w-[32px] h-[41px] md:w-[61px] md:h-[77px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <ShortXcel />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Sheets</span>
                      <span className="text-[#00000069]">xls . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col ">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <img
                    src="/rich.png"
                    className={"w-[41px] h-[41px] md:w-[77px] md:h-[77px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <ShortRich />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Workspace</span>
                      <span className="text-[#00000069]">docs . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
              <div className="w-[109px] h-[117px] md:w-[207px] md:h-[213px] flex flex-col">
                <div className="flex items-center justify-center h-[80%]  bg-white rounded-[16px] md:rounded-[32px]">
                  <img
                    src="/pic.png"
                    className={"w-[52px] h-[47px] md:w-[99px] md:h-[90px]"}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Gallery className={"w-3 h-3 md:w-4 md:h-4"} />
                    <p className="text-[10px] md:text-[12px] font-sans flex flex-col">
                      <span>Butterfly </span>
                      <span className="text-[#00000069]">png . 1h ago</span>
                    </p>
                  </div>
                  <span>
                    <ThreeDots />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="container md:rounded-xl  md:border w-full h-full my-4">
              {/* <table className="min-w-full table-auto border-collapse ">
              <thead className="bg-[#F1F5FA] rounded-xl">
                <tr>
                  <th className="px-4 py-2 flex gap-2 flex-[0.3] border text-left font-sans text-[14px]">
                    <Circle />
                    Name
                  </th>
                  <th className="px-4 py-2 flex-[0.5] border text-left font-sans text-[14px]">
                    Shared By
                  </th>
                  <th className="px-4 py-2 flex-[0.5] border text-left font-sans text-[14px]">
                    File Size
                  </th>

                  <th className="px-2 py-2 flex-[0.1] border text-left font-sans text-[14px]">
                    More
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item,index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border flex gap-2 border-[#eaeaea]"><Circle />{item.name}</td>
                    <td className="px-4 py-2 border border-[#eaeaea]">
                      {item.PersonName} {item.PersonName === "" && <NoPerson />}
                    </td>
                    <td className="px-4 py-2 border border-[#eaeaea]">{item.size}</td>
                    <td className="px-4 py-2 border border-[#eaeaea]">
                      <ThreeDots />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
              <div className="h-full rounded-xl bg-[#F1F5FA] w-[full] hidden md:flex flex-col ">
                <div className="overflow-hidden rounded-xl  bg-[#F1F5FA] w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
                  <p className="border w-[30%] gap-2 h-full flex items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>{" "}
                    Name
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    Shared by
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    File Size
                  </p>
                  <p className="border w-[10%] h-full flex items-center justify-start px-4">
                    More
                  </p>
                </div>
                <div className="overflow-hidden   bg-white w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-4"} /> Design &Campign.xls
                  </p>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <NoPerson /> _
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    3.0GB
                  </p>

                  <Popup
                    trigger={
                      <p className="cursor-pointer border w-[10%] h-full flex items-center justify-start px-4">
                        <ThreeDots />
                      </p>
                    }
                    position="bottom right"
                    arrowStyle={{
                      color: "white",
                      transform: "translateX(20px)",
                    }}
                    contentStyle={{
                      marginLeft: "-50px",
                      marginTop: "-10px",
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      borderColor: "white",
                      border: "none",
                      width: "auto",
                      height: "auto",
                      boxShadow: "0px -2px 12px 0px #0000001A",
                    }}
                    // arrowClassName="popup-arrow"
                    className="popup-content"
                  >
                    <div className=" flex flex-col gap-2 p-2 pr-4 font-sans text-[14px]">
                      <div className="flex gap-2 items-center text-black">
                        <Copy />
                        Copy
                      </div>
                      <div className="flex gap-2 items-center text-black">
                        <NoPerson className={"w-4 h-4"} />
                        Share
                      </div>
                      <div className="flex gap-2 items-center text-black">
                        <Download />
                        Download
                      </div>
                      <div className="flex gap-2 items-center text-black">
                        <Rename />
                        Rename
                      </div>
                      <div className="flex gap-2 items-center text-black">
                        <Starred className={"w-4 h-4"} />
                        Starred
                      </div>
                      <div className="flex gap-2 items-center text-black whitespace-nowrap">
                        <Trash className={"w-4 h-4"} />
                        Move to Trash
                      </div>
                    </div>
                  </Popup>
                </div>
                <div className="overflow-hidden   bg-white w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-4"} /> Design &Campign.xls
                  </p>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <img src="per1.png" alt="" /> Roanldo Richards
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    3.0GB
                  </p>
                  <p className="border w-[10%] h-full flex items-center justify-start px-4">
                    <ThreeDots />
                  </p>
                </div>
                <div className="overflow-hidden   bg-[#F8FAFC] w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto cursor-pointer text-start mr-4"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <img src="rich.png" alt="" className={"w-4 h-4"} />
                    Design &Campign.xls
                  </p>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <img src="per1.png" alt="" /> Richards
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    3.0GB
                  </p>
                  <p className="border w-[10%] h-full flex items-center justify-start px-4">
                    <ThreeDots />
                  </p>
                </div>
                <div className="overflow-hidden   bg-white w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto cursor-pointer text-start mr-4"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Gallery className={"w-3 h-3 md:w-4 md:h-4"} /> Design
                    &Campign.xls
                  </p>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <img src="per1.png" alt="" /> Roanldo
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    3.0GB
                  </p>
                  <p className="border w-[10%] h-full flex items-center justify-start px-4">
                    <ThreeDots />
                  </p>
                </div>
                <div className="overflow-hidden  bg-[#F8FAFC] w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center">
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto cursor-pointer text-start mr-4"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-4"} /> Design &Campign.xls
                  </p>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <NoPerson /> _
                  </p>
                  <p className="border w-[30%] h-full flex items-center justify-start px-4">
                    3.0GB
                  </p>
                  <p className="border w-[10%] h-full flex items-center justify-start px-4">
                    <ThreeDots />
                  </p>
                </div>
              </div>
              <div className="w-full h-[74px] my-2  rounded-tl-[12px] rounded-tr-[12px] bg-[#FFFFFF] md:hidden flex flex-col items-center">
                <div className="h-[50%] w-full bg-[#F1F5FA] rounded-tl-[12px] rounded-tr-[12px] px-2 pr-4 flex justify-between items-center">
                  <p className="flex items-center font-sans text-[10px]">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-5 mr-1"} /> Design &Campign.xls
                  </p>
                  <ThreeDots />
                </div>
                <div className="h-[50%] w-[85%] flex justify-between items-center">
                  <p className="border-b w-[50%] h-full flex gap-2 items-center justify-start px-4">
                    <NoPerson className={"w-[20px] h-[20px]"} /> _
                  </p>
                  <p className=" w-[50%] text-[10px] font-sans h-full flex items-center justify-end px-4">
                    File size: 3.0 GB
                  </p>
                </div>
              </div>
              <div className="w-full h-[74px] my-2  rounded-tl-[12px] rounded-tr-[12px] bg-[#FFFFFF] md:hidden flex flex-col items-center">
                <div className="h-[50%] w-full bg-[#F1F5FA] rounded-tl-[12px] rounded-tr-[12px] px-2 pr-4 flex justify-between items-center">
                  <p className="flex items-center font-sans text-[10px]">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-5 mr-1"} /> Design &Campign.xls
                  </p>
                  <ThreeDots />
                </div>
                <div className="h-[50%] w-[85%] flex justify-between items-center">
                  <p className="border-b w-[50%] h-full flex gap-2 items-center justify-start px-4">
                    <NoPerson className={"w-[20px] h-[20px]"} /> _
                  </p>
                  <p className=" w-[50%] text-[10px] font-sans h-full flex items-center justify-end px-4">
                    File size: 3.0 GB
                  </p>
                </div>
              </div>
              <div className="w-full h-[74px] my-2  rounded-tl-[12px] rounded-tr-[12px]  bg-[#FFFFFF] md:hidden flex flex-col items-center">
                <div className="h-[50%] w-full bg-[#F1F5FA] rounded-tl-[12px] rounded-tr-[12px] px-2 pr-4 flex justify-between items-center">
                  <p className="flex items-center font-sans text-[10px]">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-5 mr-1"} /> Design &Campign.xls
                  </p>
                  <ThreeDots />
                </div>
                <div className="h-[50%] w-[85%] flex justify-between items-center">
                  <p className="border-b w-[50%] h-full flex gap-2 items-center justify-start px-4">
                    <NoPerson className={"w-[20px] h-[20px]"} /> _
                  </p>
                  <p className=" w-[50%] text-[10px] font-sans h-full flex items-center justify-end px-4">
                    File size: 3.0 GB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilesList;
