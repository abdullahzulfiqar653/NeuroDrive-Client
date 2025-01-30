import { useState } from "react";
import {
  CleanMeta,
  Download,
  NoPerson,
  Rename,
  Starred,
  Trash,
} from "../assets/Icons";
import MetaData from "./MetaData";
import ReNameFile from "./ReNameFile";
import { toast } from "react-toastify";

const CustomPopup = ({
  file,
  setActiveIndex,
  handleUnStarClick,
  handleStarClick,
  handleDownloadClick,
  handleDeleteClick,
  meta,
  name,
  id,
}: any) => {
  const [toggleReName, settoggleReName] = useState(false);
  const [metaToggle, setMetaToggle] = useState<boolean>(false);

  const handleMetaData = (meta: any) => {
    if (
      meta === null ||
      (typeof meta === "object" && Object.keys(meta).length === 0)
    ) {
      toast.warn("Meta data is already removed");
      setActiveIndex(null);
    } else {
      setMetaToggle(true);
      // setActiveIndex(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 font-sans text-[14px] z-50">
      <div className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer">
        <NoPerson className="w-4 h-4" /> Share
      </div>
      {file?.is_starred ? (
        <div
          onClick={handleUnStarClick}
          className="flex gap-2 items-center whitespace-nowrap cursor-pointer"
        >
          <Starred className="w-4 h-4 fill-yellow-300" /> Unstarred
        </div>
      ) : (
        <div
          onClick={handleStarClick}
          className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
        >
          <Starred className="w-4 h-4" /> Starred
        </div>
      )}
      <div
        onClick={() => {
          settoggleReName(true);
        }}
        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
      >
        <Rename /> Rename
      </div>
      {toggleReName && (
        <ReNameFile
          fileId={file?.id}
          settoggleReName={settoggleReName}
          setActiveIndex={setActiveIndex}
        />
      )}
      <div
        onClick={handleDownloadClick}
        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer"
      >
        <Download /> Download
      </div>
      <div
        onClick={() => {
          handleMetaData(meta);
        }}
        className="flex gap-2 items-center whitespace-nowrap text-black cursor-pointer"
      >
        <CleanMeta /> Clean meta data
      </div>
      {metaToggle && (
        <MetaData
          meta={meta}
          name={name}
          setMetaToggle={setMetaToggle}
          id={id}
        />
      )}
      <div
        onClick={handleDeleteClick}
        className="flex gap-2 items-center whitespace-nowrap text-black cursor-pointer"
      >
        <Trash className="w-4 h-4" /> Move to Trash
      </div>
    </div>
  );
};

export default CustomPopup;
