import { useState } from "react";
import RegisterInfo from "../../Components/RegisterInfo";
import RegisterSeeds from "../../Components/RegisterSeeds";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function Register() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [acknowledged, setAcknowledged] = useState(false);
  

  if (isAuthenticated ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="bg-white relative w-full h-dvh">
      {acknowledged ? (
        <RegisterSeeds/>
      ) : (
        <RegisterInfo setAcknowledged={setAcknowledged} />
      )}
      <div className="absolute hidden md:flex  items-end  bottom-0  w-full font-sans text-[#1E1E1E66] pl-2 pb-1 text-[14px]">
        <p className="pr-3 border-r-[1.17px] border-[#1E1E1E66]">
          Terms & Conditions
        </p>
        <p className="pl-3">Privacy Policy</p>
      </div>
    </div>
  );
}

export default Register;
