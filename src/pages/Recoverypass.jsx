import React, { useEffect } from "react";
import UpdatePassForm from "../components/UpdatePassForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Recoverypass = () => {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, []);
  console.log(location.state);
  return (
    <div className="Recoverypass">
      <UpdatePassForm dataRecovery={location.state} />
    </div>
  );
};

export default Recoverypass;
