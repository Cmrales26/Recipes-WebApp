import { Button } from "@mui/material";
import React, { useState } from "react";

const PageController = ({
  recipeData,
  page,
  setPage,
  initRange,
  lastRange,
  numofsteps,
  setLastRange,
  setInitRange,
}) => {
  const totalPages = Math.ceil(recipeData.length / numofsteps);

  const netxhandler = () => {
    if (page >= totalPages) {
      return;
    }
    setPage(page + 1);
    setInitRange(initRange + numofsteps);
    setLastRange(lastRange + numofsteps);
  };

  const prevhandler = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
    setInitRange(initRange - numofsteps);
    setLastRange(lastRange - numofsteps);
  };
  return (
    <section id="PageController">
      <Button onClick={prevhandler} variant="outlined">
        Anterior
      </Button>
      <p>
        {page} / {totalPages}
      </p>
      <Button onClick={netxhandler} variant="outlined">
        Siguiente
      </Button>
    </section>
  );
};

export default PageController;
