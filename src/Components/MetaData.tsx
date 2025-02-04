import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { postData } from "../features/ApiSlice";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";
import { getDirectory } from "../features/directories/folderSlice";

type MetaDataType = {
  file_name: string;
  file_extension: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  owner: string;
  readable: boolean;
  writable: boolean;
};

interface MetaDataProps {
  meta: MetaDataType;
  setMetaToggle: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  id: number;
  setActiveIndex: any;
}

const MetaData = ({
  meta,
  name,
  id,
  setMetaToggle,
  setActiveIndex,
}: MetaDataProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = async (id: number) => {
    const paylod = {
      is_remove_metadata: true,
    };
    const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
    try {
      const data = await dispatch(
        postData({
          url: `files/${id}/`,
          method: "patch",
          payload: paylod,
          key: "metaRemove",
        })
      ).unwrap();
      if (data.status === 200) {
        toast.success("Meta data is removed");
        setMetaToggle(false);
        setActiveIndex(null);
        dispatch(getDirectory(parentFolderId));
      }
    } catch (error) {
      toast.warn("Error in removing meta data");
      setMetaToggle(false);
      setActiveIndex(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="w-[70vw] md:w-[90vw] sm:w-[90vw] h-[85vh]  relative max-w-[901px] md:min-w-[493px] md:min-h-[506px] rounded-lg px-2 sm:px-4 py-2 bg-[#ffffff] items-center justify-center sm:flex sm:h-[80vh] md:h-[85vh] md:flex sm:justify-around md:justify-around md:gap-4">
        <div className="flex flex-col gap-2 sm:gap-5 items-center justify-center">
          <div className="flex justify-start w-full">
            <p onClick={() => setMetaToggle(false)}>
              <IoIosArrowBack className="font-bold text-[18px] sm:text-2xl mt-1 cursor-pointer" />
            </p>
            <h1 className="text-[18px] sm:text-2xl font-extrabold">
              Meta Data Cleaner
            </h1>
          </div>
          <div>
            <img
              className=" h-[163px] sm:h-[289px] md:h-[330px] w-[64vw] sm:w-[318px] object-cover rounded-lg"
              src="meta.png"
              alt=""
            />
          </div>
          <p className="w-[60vw] sm:w-[300px] text-[10px] sm:text-xs text-start">
            NOTE: Once the cleaning process is completed, it will not be
            possible to recover this information.
          </p>
          <button
            onClick={() => handleRemove(id)}
            className="bg-[#F5000D] w-[162px] h-[42px] p-2 text-white rounded-lg self-center outline-none hidden sm:block"
          >
            Clean
          </button>
        </div>
        <div className="flex w-full sm:w-[50%] flex-col pt-1 gap-1 sm:gap-5 justify-center">
          <h1 className="text-[18px] sm:text-2xl font-extrabold md:text-center sm:text-center">
            Details
          </h1>
          <p className="text-[11px] sm:text-[16px] font-[500]">{name}</p>
          <div className="bg-[#ECECEC6B] w-full sm:w-[300px] md:w-full font-[500] font-sans h-[31vh] sm:h-full rounded-md px-3 pt-3 overflow-y-auto">
            {Object.entries(meta ?? {}).map(([key, value]) => (
              <div key={key} className="flex border-b-2 pb-2">
                <h1 className="opacity-35 w-36 mr-2 sm:mr-5 text-[10px] sm:text-[16px]">
                  {key}
                </h1>
                <p className="text-wrap w-full break-words text-[10px] sm:text-[16px] truncate">
                  {typeof value === "boolean"
                    ? value.toString()
                    : value || "N/A"}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleRemove(id)}
            className="bg-[#F5000D] mb-0 w-[130px] h-[32px] text-white rounded-lg self-center outline-none  sm:hidden md:hidden"
          >
            Clean
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MetaData;
