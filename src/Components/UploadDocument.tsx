import { useRef, useState } from "react";
import { Cross, Upload } from "../assets/Icons";
import { useAuth } from "../AuthContext";

function UploadDocument() {
  const { toggleComponent } = useAuth();
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("Dropped file:", file);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
        <div className="w-[95vw] h-[60vh] gap-4 relative max-w-[351px] max-h-[366px] md:min-w-[493px] md:min-h-[463px] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
          <span
            onClick={() => toggleComponent("upload")}
            className="absolute right-[17px] top-[17px] cursor-pointer"
          >
            <Cross
              className="w-[11px] h-[11px] md:w-3 md:h-3"
              color="#000000"
            />
          </span>
          <p className="text-[22px] text-[#202343] mt-6">Upload document</p>
          <div
            className={`flex flex-col items-center gap-3 w-[90%] h-[55%] justify-center text-[black] border ${
              dragging
                ? "border-solid border-blue-500"
                : "border-dashed border-[#3E85FF]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload />
            <p className="text-[16px] font-sans font-[500]">
              Drag and drop files here
            </p>
            <p className="text-[16px] font-sans font-[500] text-[#0000004D]">
              OR
            </p>
            <button
              onClick={handleButtonClick}
              className="w-[239px] h-[43px] rounded-md border border-[#A9A9A9] hover:bg-[#e9e9e968] hover:shadow-xl font-sans text-[14px] text-[#5160F3]"
            >
              Click here to upload
            </button>
            <input
              type="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <p className="text-[#B3B3B3] text-[11px] font-sans text-center">
              Supported: JPG,JPEG, PNG, PDF, XLS , doc. File size should be
              maximum 25mb and it shouldn’t be password protected
            </p>
          </div>
          <button
            style={{
              background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
              borderImageSource:
                "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
            }}
            className="w-[132px] h-[34px] md:w-[163px]  md:h-[42px] rounded-xl text-white font-sans text-[13px] mt-1"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadDocument;
