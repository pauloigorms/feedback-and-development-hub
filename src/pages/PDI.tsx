
import React from "react";
import { useParams } from "react-router-dom";
import { PDIList } from "@/components/pdi/PDIList";
import { PDIDetail } from "@/components/pdi/PDIDetail";
import { PDIForm } from "@/components/pdi/PDIForm";

const PDI = () => {
  const { id, action } = useParams<{ id?: string; action?: string }>();
  
  if (id && action === "edit") {
    return <PDIForm />;
  }
  
  if (id && action === "new") {
    return <PDIForm />;
  }
  
  if (id) {
    return <PDIDetail />;
  }
  
  return <PDIList />;
};

export default PDI;
