import { useState } from "react";
import {
  Add,
  Download,
  Folders,
  Gallery,
  IconsProps,
  Trash,
  Xcel,
} from "../assets/Icons";
import Popup from "reactjs-popup";
import { useAuth } from "../AuthContext";
import { FileViewer } from "../Hooks/FileViewer";

function FilesList() {
  const [isOpen, seIsOpen] = useState(false);
  const { toggleComponent } = useAuth();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };
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
                <div className="overflow-hidden   bg-white w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center" onClick={handleClick}>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-4"} /> Design &Campign.xls
                    {isSelected && (
                      <FileViewer fileUrl='https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/students-data-report.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250103%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250103T172929Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3b07afd316486f58f9035314d0043f11c0f2b8d91025b0b4db2e766ab38a5ebe' fileType={'excel'} fileName={'sample'} />
                    )}
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
                <div className="overflow-hidden   bg-white w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center" onClick={handleClick}>
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto text-start mr-4 cursor-pointer"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-4"} /> Design &Campign.xls
                    {isSelected && (
                      <FileViewer fileUrl='https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/students-data-report.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250103%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250103T172929Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3b07afd316486f58f9035314d0043f11c0f2b8d91025b0b4db2e766ab38a5ebe' fileType={'excel'} fileName={'sample'} />
                    )}
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
                <div className="overflow-hidden  bg-[#F8FAFC] w-[full] text-[14px] h-[57px]  font-sans flex  justify-between items-center" onClick={handleClick} >
                  <p className="border w-[30%] h-full flex gap-2 items-center justify-start px-4">
                    <span
                      onClick={() => setRadioClick((prev) => !prev)}
                      className="w-auto cursor-pointer text-start mr-4"
                    >
                      <Circle color={radioClick ? "#2676ff" : "none"} />
                    </span>
                    <Xcel className={"w-4 h-4"} /> Design &Campign.xls
                    {isSelected && (
                      <FileViewer fileUrl='https://neuroservices.lon1.digitaloceanspaces.com/neuroservices/test/students-data-report.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00N87PJKGNJTGMNEMZ%2F20250103%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250103T172929Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3b07afd316486f58f9035314d0043f11c0f2b8d91025b0b4db2e766ab38a5ebe' fileType={'excel'} fileName={'sample'} />
                    )}
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

const Copy = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25 3.75H8.75C10 3.75 10 3.125 10 2.5C10 1.25 9.375 1.25 8.75 1.25H6.25C5.625 1.25 5 1.25 5 2.5C5 3.75 5.625 3.75 6.25 3.75Z"
      stroke="#292D32"
      strokeWidth="0.7"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 2.51245C12.0812 2.62495 13.125 3.3937 13.125 6.24995V9.99995C13.125 12.5 12.5 13.75 9.375 13.75H5.625C2.5 13.75 1.875 12.5 1.875 9.99995V6.24995C1.875 3.39995 2.91875 2.62495 5 2.51245"
      stroke="#292D32"
      strokeWidth="0.7"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShortRich = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[12px] h-[12px] md:w-[18px] md:h-[20px]"
  >
    <path
      d="M6.64977 0C5.60977 0 4.75977 0.84 4.75977 1.88V2.82C4.75977 3.86 5.59977 4.7 6.63977 4.7H11.3498C12.3898 4.7 13.2298 3.86 13.2298 2.82V1.88C13.2398 0.84 12.3898 0 11.3498 0H6.64977Z"
      fill="#00ACEA"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.3491 5.70949H6.64906C5.05906 5.70949 3.75906 4.40949 3.75906 2.81949C3.75906 2.25949 3.15906 1.90949 2.65906 2.16949C1.24906 2.91949 0.289062 4.40949 0.289062 6.11949V15.5295C0.289062 17.9895 2.29906 19.9995 4.75906 19.9995H13.2391C15.6991 19.9995 17.7091 17.9895 17.7091 15.5295V6.11949C17.7091 4.40949 16.7491 2.91949 15.3391 2.16949C14.8391 1.90949 14.2391 2.25949 14.2391 2.81949C14.2391 4.40949 12.9391 5.70949 11.3491 5.70949ZM4.99906 14.9495C4.58906 14.9495 4.24906 14.6095 4.24906 14.1995C4.24906 13.7895 4.58906 13.4495 4.99906 13.4495H9.37906C9.78906 13.4495 10.1291 13.7895 10.1291 14.1995C10.1291 14.6095 9.78906 14.9495 9.37906 14.9495H4.99906ZM4.99906 10.9495C4.58906 10.9495 4.24906 10.6095 4.24906 10.1995C4.24906 9.78949 4.58906 9.44949 4.99906 9.44949H11.9991C12.4091 9.44949 12.7491 9.78949 12.7491 10.1995C12.7491 10.6095 12.4091 10.9495 11.9991 10.9495H4.99906Z"
      fill="#00ACEA"
    />
  </svg>
);

const ShortXcel = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[12px] h-[12px] md:w-[18px] md:h-[20px]"
  >
    <path
      d="M6.64977 0C5.60977 0 4.75977 0.84 4.75977 1.88V2.82C4.75977 3.86 5.59977 4.7 6.63977 4.7H11.3498C12.3898 4.7 13.2298 3.86 13.2298 2.82V1.88C13.2398 0.84 12.3898 0 11.3498 0H6.64977Z"
      fill="#1B965E"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.3491 5.70949H6.64906C5.05906 5.70949 3.75906 4.40949 3.75906 2.81949C3.75906 2.25949 3.15906 1.90949 2.65906 2.16949C1.24906 2.91949 0.289062 4.40949 0.289062 6.11949V15.5295C0.289062 17.9895 2.29906 19.9995 4.75906 19.9995H13.2391C15.6991 19.9995 17.7091 17.9895 17.7091 15.5295V6.11949C17.7091 4.40949 16.7491 2.91949 15.3391 2.16949C14.8391 1.90949 14.2391 2.25949 14.2391 2.81949C14.2391 4.40949 12.9391 5.70949 11.3491 5.70949ZM10.9991 14.9095C10.8091 14.9095 10.6191 14.8395 10.4691 14.6895L9.01906 13.2395L7.52906 14.7295C7.37906 14.8795 7.18906 14.9495 6.99906 14.9495C6.80906 14.9495 6.61906 14.8795 6.46906 14.7295C6.17906 14.4395 6.17906 13.9595 6.46906 13.6695L7.95906 12.1795L6.50906 10.7295C6.21906 10.4395 6.21906 9.95949 6.50906 9.66949C6.79906 9.37949 7.27906 9.37949 7.56906 9.66949L9.01906 11.1195L10.4191 9.71949C10.7091 9.42949 11.1891 9.42949 11.4791 9.71949C11.7691 10.0095 11.7691 10.4895 11.4791 10.7795L10.0791 12.1795L11.5291 13.6295C11.8191 13.9195 11.8191 14.3895 11.5291 14.6895C11.3791 14.8395 11.1891 14.9095 10.9991 14.9095Z"
      fill="#1B965E"
    />
  </svg>
);

const Box = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[15px] h-[15px] md:h-[21px] md:w-[21px]"
  >
    <path
      d="M7.875 19.25H13.125C17.5 19.25 19.25 17.5 19.25 13.125V7.875C19.25 3.5 17.5 1.75 13.125 1.75H7.875C3.5 1.75 1.75 3.5 1.75 7.875V13.125C1.75 17.5 3.5 19.25 7.875 19.25Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.25 8.75H1.75"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 8.75V19.25"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NoPerson = ({ className }: IconsProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.4599 13.73C13.0118 13.73 14.2699 12.4719 14.2699 10.92C14.2699 9.36806 13.0118 8.10999 11.4599 8.10999C9.90798 8.10999 8.6499 9.36806 8.6499 10.92C8.6499 12.4719 9.90798 13.73 11.4599 13.73Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.65 20.2C16.65 17.87 14.33 15.97 11.46 15.97C8.59002 15.97 6.27002 17.86 6.27002 20.2"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12.5C21 17.75 16.75 22 11.5 22C6.25 22 2 17.75 2 12.5C2 7.25 6.25 3 11.5 3C12.81 3 14.06 3.25999 15.2 3.73999C15.07 4.13999 15 4.56 15 5C15 5.75 15.21 6.46 15.58 7.06C15.78 7.4 16.04 7.70997 16.34 7.96997C17.04 8.60997 17.97 9 19 9C19.44 9 19.86 8.92998 20.25 8.78998C20.73 9.92998 21 11.19 21 12.5Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 5C23 5.32 22.96 5.62999 22.88 5.92999C22.79 6.32999 22.63 6.72 22.42 7.06C21.94 7.87 21.17 8.49998 20.25 8.78998C19.86 8.92998 19.44 9 19 9C17.97 9 17.04 8.60997 16.34 7.96997C16.04 7.70997 15.78 7.4 15.58 7.06C15.21 6.46 15 5.75 15 5C15 4.56 15.07 4.13999 15.2 3.73999C15.39 3.15999 15.71 2.64002 16.13 2.21002C16.86 1.46002 17.88 1 19 1C20.18 1 21.25 1.51002 21.97 2.33002C22.61 3.04002 23 3.98 23 5Z"
      stroke="#292D32"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.49 4.97998H17.51"
      stroke="#292D32"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 3.52002V6.51001"
      stroke="#292D32"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThreeDots = () => (
  <svg
    width="4"
    height="18"
    viewBox="0 0 4 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[10px] h-[12px] md:w-[18px] md:h-[18px]"
  >
    <path
      d="M2 17C2.26522 17 2.51957 16.8946 2.70711 16.7071C2.89464 16.5196 3 16.2652 3 16C3 15.7348 2.89464 15.4804 2.70711 15.2929C2.51957 15.1054 2.26522 15 2 15C1.73478 15 1.48043 15.1054 1.29289 15.2929C1.10536 15.4804 1 15.7348 1 16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17ZM2 10C2.26522 10 2.51957 9.89464 2.70711 9.70711C2.89464 9.51957 3 9.26522 3 9C3 8.73478 2.89464 8.48043 2.70711 8.29289C2.51957 8.10536 2.26522 8 2 8C1.73478 8 1.48043 8.10536 1.29289 8.29289C1.10536 8.48043 1 8.73478 1 9C1 9.26522 1.10536 9.51957 1.29289 9.70711C1.48043 9.89464 1.73478 10 2 10ZM2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Circle = ({ color }: IconsProps) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    className="w-[16px] h-[16px] md:w-[21px] md:h-[21px]"
  >
    <circle cx="10.5" cy="10.5" r="10" stroke="#343434" stroke-opacity="0.34" />
  </svg>
);

const List = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[16px] h-[16px] md:h-[18px] md:w-[18px]"
  >
    <path
      d="M16.5 6.39V2.985C16.5 1.9275 16.02 1.5 14.8275 1.5H11.7975C10.605 1.5 10.125 1.9275 10.125 2.985V6.3825C10.125 7.4475 10.605 7.8675 11.7975 7.8675H14.8275C16.02 7.875 16.5 7.4475 16.5 6.39Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 14.8275V11.7975C16.5 10.605 16.02 10.125 14.8275 10.125H11.7975C10.605 10.125 10.125 10.605 10.125 11.7975V14.8275C10.125 16.02 10.605 16.5 11.7975 16.5H14.8275C16.02 16.5 16.5 16.02 16.5 14.8275Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.875 6.39V2.985C7.875 1.9275 7.395 1.5 6.2025 1.5H3.1725C1.98 1.5 1.5 1.9275 1.5 2.985V6.3825C1.5 7.4475 1.98 7.8675 3.1725 7.8675H6.2025C7.395 7.875 7.875 7.4475 7.875 6.39Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.875 14.8275V11.7975C7.875 10.605 7.395 10.125 6.2025 10.125H3.1725C1.98 10.125 1.5 10.605 1.5 11.7975V14.8275C1.5 16.02 1.98 16.5 3.1725 16.5H6.2025C7.395 16.5 7.875 16.02 7.875 14.8275Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Filter = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[12px] h-[14px] md:h-[23px] md:w-[23px]"
  >
    <path
      d="M5.17497 2.01257H17.825C18.8791 2.01257 19.7416 2.87507 19.7416 3.92924V6.03757C19.7416 6.80424 19.2625 7.76257 18.7833 8.24174L14.6625 11.8834C14.0875 12.3626 13.7041 13.3209 13.7041 14.0876V18.2084C13.7041 18.7834 13.3208 19.5501 12.8416 19.8376L11.5 20.7001C10.2541 21.4667 8.52913 20.6042 8.52913 19.0709V13.9917C8.52913 13.3209 8.1458 12.4584 7.76247 11.9792L4.1208 8.14591C3.64163 7.66674 3.2583 6.80424 3.2583 6.22924V4.02507C3.2583 2.87507 4.1208 2.01257 5.17497 2.01257Z"
      stroke="#292D32"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.4746 2.01257L5.75 9.58341"
      stroke="#292D32"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Rename = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.18264 1.94991L2.73556 6.657C2.56764 6.83575 2.40514 7.18783 2.37264 7.43158L2.17223 9.18658C2.10181 9.82033 2.55681 10.2537 3.18514 10.1453L4.92931 9.84741C5.17306 9.80408 5.51431 9.62533 5.68223 9.44116L10.1293 4.73408C10.8985 3.92158 11.2451 2.99533 10.0481 1.86325C8.85639 0.741997 7.95181 1.13741 7.18264 1.94991Z"
      stroke="#292D32"
      strokeWidth="0.7"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.44067 2.73535C6.67359 4.23035 7.88692 5.37327 9.39276 5.52493"
      stroke="#292D32"
      strokeWidth="0.7"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.625 11.9166H11.375"
      stroke="#292D32"
      strokeWidth="0.7"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Starred = ({ className }: IconsProps) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} w-[12px] h-[12px] md:w-[19px] md:h-[19px]`}
  >
    <path
      d="M12.1577 2.36366L13.8444 5.73699C14.0744 6.20657 14.6877 6.65699 15.2052 6.74324L18.2623 7.25116C20.2173 7.57699 20.6773 8.99532 19.2685 10.3945L16.8919 12.7712C16.4894 13.1737 16.269 13.9499 16.3935 14.5057L17.074 17.4478C17.6106 19.7766 16.3744 20.6774 14.314 19.4603L11.4485 17.7641C10.931 17.4574 10.0781 17.4574 9.55104 17.7641L6.68562 19.4603C4.63479 20.6774 3.38896 19.767 3.92562 17.4478L4.60604 14.5057C4.73062 13.9499 4.51021 13.1737 4.10771 12.7712L1.73104 10.3945C0.331874 8.99532 0.782291 7.57699 2.73729 7.25116L5.79437 6.74324C6.30229 6.65699 6.91562 6.20657 7.14562 5.73699L8.83229 2.36366C9.75229 0.533241 11.2473 0.533241 12.1577 2.36366Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Recent = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
  >
    <path
      d="M20.1666 11C20.1666 16.06 16.0599 20.1667 10.9999 20.1667C5.93992 20.1667 1.83325 16.06 1.83325 11C1.83325 5.94004 5.93992 1.83337 10.9999 1.83337C16.0599 1.83337 20.1666 5.94004 20.1666 11Z"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4006 13.915L11.559 12.2192C11.064 11.9258 10.6606 11.22 10.6606 10.6425V6.88416"
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
