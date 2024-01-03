import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InserPass from "../components/InserPass";
import { useState } from "react";

const DisableAccount = () => {
  const [accept, setAccept] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="DisableAccount">
      {accept ? (
        <InserPass setAccept={setAccept} />
      ) : (
        <div className="DisableContainer">
          <h3>¡Atención!</h3>
          <p>
            Al desactivar tu cuenta, esta no será eliminada permanentemente,
            pero permanecerá inaccesible hasta que autorices su reactivación.
            Debido a sus asociaciones con puntuaciones y categorías, la
            eliminación permanente no es posible, y la información asociada a
            esta cuenta se mantendrá intacta.
            <br />
            <br />
            Si estás seguro, procede con la desactivación. Gracias por tu
            comprensión.
          </p>
          <Stack spacing={2} direction="row" className="btncontainer">
            <Button variant="contained" onClick={() => setAccept(true)}>
              Continuar
            </Button>
            <Button variant="outlined" onClick={() => navigate("/home")}>
              Cancelar
            </Button>
          </Stack>
        </div>
      )}
    </section>
  );
};

export default DisableAccount;
