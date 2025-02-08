import { useState } from "react";
import {
  CleanMeta,
  Download,
  Encrypt,
  NoPerson,
  Rename,
  Trash,
  Lock,
  Starred,
} from "../assets/Icons";
import { CiStar } from "react-icons/ci";
import MetaData from "./MetaData";
import ReNameFile from "./ReNameFile";
import { toast } from "react-toastify";
import SetPassword from "./SetPassword";
import Quantumography from "./Quantumography";
import ShareFile from "./ShareFile";

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
  isProtected,
}: any) => {
  const [toggleReName, settoggleReName] = useState(false);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [togglePassword, settogglePassword] = useState(false);
  const [toggleQuantumography, setToggleQuantumography] = useState(false);
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
    }
  };
  return (
    <div className="flex flex-col gap-[6px] md:gap-2 font-sans text-[11.5px] md:text-[14px] z-50">
      <div
        onClick={() => setIsShare(true)}
        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer rounded hover:shadow-md"
      >
        <NoPerson className="w-4 h-4" /> Share
      </div>
      {isShare && <ShareFile file={file} setShare={setIsShare} />}
      {file?.is_starred ? (
       
        <div
        
          onClick={handleUnStarClick}
          className="flex gap-3 md:gap-2 lg:gap-2 items-center whitespace-nowrap cursor-pointer hover:shadow-md"
        >
          <Starred className="w-4 h-4  fill-yellow-300" /> Unstarred
          {/* <CiStar className="w-5 h-5 fill-yellow-400" /> Unstarred */}
        </div>
      ) : (
        <div
          onClick={handleStarClick}
          className="flex gap-3 md:gap-2 lg:gap-2 text-black items-center whitespace-nowrap cursor-pointer hover:shadow-md"


        >
          <CiStar className="w-5 h-5" /> Starred
        </div>

      )}

    
      <div
        onClick={() => {
          settoggleReName(true);
        }}
        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer px-1 hover:shadow-md"
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
        className="flex gap-2 items-center text-black whitespace-nowrap cursor-pointer px-1 hover:shadow-md"
      >
        <Download /> Download
      </div>
      <div
        onClick={() => {
          handleMetaData(meta);
        }}
        className="flex gap-2 items-center whitespace-nowrap text-black cursor-pointer px-1 hover:shadow-md"
      >
        <CleanMeta /> Clean meta data
      </div>
      {metaToggle && (
        <MetaData
          meta={meta}
          name={name}
          setMetaToggle={setMetaToggle}
          id={id}
          setActiveIndex={setActiveIndex}
        />
      )}
      <div
        onClick={handleDeleteClick}
        className="flex gap-2 items-center whitespace-nowrap text-black cursor-pointer px-1 hover:shadow-md"
      >
        <Trash className="w-4 h-4" /> Move to Trash
      </div>
      {!isProtected && (
        <div
          onClick={() => {
            setToggleQuantumography(true);
          }}
          className="flex gap-2 items-center whitespace-nowrap text-black cursor-pointer px-1 hover:shadow-md"
        >
          <Encrypt /> Encrypt
        </div>
      )}
      {toggleQuantumography && (
        <Quantumography
          setToggleQuantumography={setToggleQuantumography}
          fileId={id}
        />
      )}

      <div
        onClick={() => {
          settogglePassword(true);
        }}
        className="flex gap-2 items-center whitespace-nowrap text-black cursor-pointer px-1 hover:shadow-md"
      >
        <Lock /> Set Password
      </div>
      {togglePassword && (
        <SetPassword
          fileId={file?.id}
          settogglePassword={settogglePassword}
          setActiveIndex={setActiveIndex}
        />
      )}
    </div>
  );
};

export default CustomPopup;
