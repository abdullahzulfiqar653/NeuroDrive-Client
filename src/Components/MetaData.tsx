import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { postData } from "../features/ApiSlice";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";

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
}

const MetaData = ({ meta, name, id, setMetaToggle }: MetaDataProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = async (id: number) => {
    const paylod = {
      is_removed_metadata: true,
    };
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
        toast.success("Meta datais removed");
        setMetaToggle(false);
      }
    } catch (error) {
      toast.warn("Error in removing meta data");
      setMetaToggle(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center overflow-y-auto">
      <div className="w-[70vw] md:w-[90vw] sm:w-[90vw] relative max-w-[901px] md:min-w-[493px] rounded-lg px-4 bg-white items-center justify-center sm:flex sm:h-[80vh] md:h-[80vh] md:flex sm:justify-around md:justify-around md:gap-4">
        {/* <div className="bg-white "> */}
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex">
            <p onClick={() => setMetaToggle(false)}>
              <IoIosArrowBack className="font-bold text-2xl mt-1 cursor-pointer" />
            </p>
            <h1 className="text-2xl font-extrabold">Meta Data Cleaner</h1>
          </div>
          <div className="">
            <img
              className=" sm:w-[280px]  md:w-[318px] object-cover rounded-lg"
              src="meta.png"
              alt=""
            />
          </div>
          <p className="w-[300px] text-xs">
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
        <div className="flex sm:w-[50%] flex-col pt-11 sm:pt-0 md:pt-0  gap-5 justify-center">
          <h1 className="text-2xl font-extrabold md:text-center sm:text-center">
            Details
          </h1>
          <p>{name}</p>
          <div className="bg-[#ECECEC6B] w-full sm:w-[300px] md:w-full h-[360px] rounded-md p-3">
            {Object.entries(meta ?? {}).map(([key, value]) => (
              <div key={key} className="flex border-b-2 pb-2">
                <h1 className="opacity-35 w-36 pl-2">{key}</h1>
                {value === false ? (
                  <p className="text-wrap w-full break-words ">false</p>
                ) : value === true ? (
                  <p className="text-wrap w-full break-words ">true</p>
                ) : (
                  <p className="text-wrap w-full break-words ">
                    {value as any}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => handleRemove(id)}
            className="bg-[#F5000D] mb-3 w-[162px] h-[42px] p-2 text-white rounded-lg self-center outline-none  sm:hidden md:hidden"
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
