import { useState } from "react";
import RegisterInfo from "../../Components/RegisterInfo";
import RegisterSeeds from "../../Components/RegisterSeeds";

function Register() {
  const [acknowledged, setAcknowledged] = useState(false);



  return (
    <div className="bg-white">
      {acknowledged ? (
        <RegisterSeeds/>
      ) : (
        <RegisterInfo setAcknowledged={setAcknowledged} />
      )}
      <div className="flex items-end  w-full font-sans text-[#1E1E1E66] pl-2 pb-1 text-[14px]">
        <p className="pr-3 border-r-[1.17px] border-[#1E1E1E66]">
          Terms & Conditions
        </p>
        <p className="pl-3">Privacy Policy</p>
      </div>
    </div>
  );
}

export default Register;
