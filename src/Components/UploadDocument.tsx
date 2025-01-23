import { useRef, useState } from "react";
import { Cross, Upload } from "../assets/Icons";
import { useAuth } from "../AuthContext";
import useApi from "../Hooks/usiApi";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

function UploadDocument() {
  const { toggleComponent } = useAuth();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { post, isLoading, reset, response, error } = useApi("uploadFile");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the file in state
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

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile); // Store the dropped file in state
      // console.log("Dropped file:", droppedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const parentFolderId = localStorage.getItem("parent_folder_id");
    post({
      url: `/directories/${parentFolderId}/files/`,
      payload: formData,
      method: "post",
    });
    if (!error) {
      toast.success("File uploaded successfully!");
    }
    if (error) {
      toast.warning("Error uploading file!");
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
            {file ? (
              <p className="text-[16px] font-sans font-[500] text-blue-600">
                {file.name}
              </p>
            ) : (
              <>
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
              </>
            )}
            {/* {!file && (
            )} */}

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
            onClick={handleSubmit}
            disabled={!file}
            style={{
              background: file
                ? "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)"
                : "linear-gradient(180deg, #CCCCCC 0%, #AAAAAA 100%)",
              borderImageSource: file
                ? "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)"
                : "linear-gradient(0deg, #CCCCCC 0%, rgba(170, 170, 170, 0) 100%)",
            }}
            className={`w-[132px] h-[34px] md:w-[163px] md:h-[42px] flex gap-3 justify-center items-center rounded-xl text-white font-sans text-[13px] mt-1 ${
              file ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            Upload
            {isLoading && <ThreeDots height="30" width="30" color="black" />}
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadDocument;
