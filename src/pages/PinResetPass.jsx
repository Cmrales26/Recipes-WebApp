import { useLocation, useNavigate } from "react-router-dom";
import Entercode from "../components/Entercode";
import { useEffect } from "react";
const PinResetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Entercode userInfo={location.state}></Entercode>
    </div>
  );
};

export default PinResetPass;
