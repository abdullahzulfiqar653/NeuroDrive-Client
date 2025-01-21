import { Cross, Xcel } from "../assets/Icons";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router-dom';

function CreateComponent() {
  const { isOpenComponent, toggleComponent } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    if (isOpenComponent.newExcel) {
      toggleComponent('newExcel', false);
    } else if (isOpenComponent.newDocs) {
      toggleComponent('newDocs', false);
    } else if (isOpenComponent.newFolder) {
      toggleComponent('newFolder', false);
    }
  };
  
  const handleCreate = () => {
    if (isOpenComponent.newExcel) {
      navigate('/text-file?type=excel');
      setTimeout(() => toggleComponent('newExcel', false), 0);
    } else if (isOpenComponent.newDocs) {
      navigate('/text-file?type=word');
      setTimeout(() => toggleComponent('newDocs', false), 0);
    } else {
      alert('Please select a file type to create.');
      handleClose(); 
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.73)] z-50 flex items-center justify-center">
      <div className="w-[95vw] h-[60vh] gap-4 relative max-w-[351px] max-h-[366px] md:min-w-[493px] md:min-h-[463px] px-3 md:px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
        <span
          onClick={handleClose}
          className="absolute right-[17px] top-[17px] cursor-pointer"
        >
          <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
        </span>
        {isOpenComponent.newFolder && <img src="/folders.png" alt="Folder Icon" className="w-[49px] h-[40px] md:w-[83px] md:h-[77px]" />}
        {isOpenComponent.newDocs && <img src="/rich.png" alt="Word Icon" />}
        {isOpenComponent.newExcel && <Xcel />}
        <p className="text-[22px] text-[#202343]">
          Create New {isOpenComponent.newFolder && "Folder"}
          {isOpenComponent.newDocs && "Neurodoc"}
          {isOpenComponent.newExcel && "Sheet"}
        </p>
        <div className="flex flex-col items-start w-full justify-start text-[12px] md:text-[14px] text-[black]">
          <p className="font-sans">Enter Name</p>
          <div className="h-[36px] w-[97%] md:h-[54px] bg-[#ECECEC] rounded-md px-3">
            <input
              type="text"
              placeholder="Workspace"
              className="w-full h-full outline-none text-[12px] font-sans font-[600] md:text-[16px] bg-[#ffffff00] placeholder:text-[black]"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          style={{
            background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
            borderImageSource: "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
          }}
          className="w-[132px] h-[34px] md:w-[163px] md:h-[42px] rounded-xl text-white font-sans text-[13px] mt-3 md:mt-5"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateComponent;