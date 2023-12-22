import { useLocation, useNavigate } from "react-router-dom";
const CodeValidation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || location.state.Newpassword === null) {
    navigate("/home");
    return null; // O podrías mostrar un mensaje de carga o hacer otra cosa aquí
  }
  return <div>
    
  </div>;
};

export default CodeValidation;
