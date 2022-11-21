import { async } from "@firebase/util";
import React, { createContext, useEffect, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [labsData, setLabsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editLab, setEditLab] = useState({
    room: {},
    edit: false,
  });

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    const response = await fetch(`/labsdata?_sort=id&_order=desc`);
    const data = await response.json();
    setLabsData(data);
    setIsLoading(false);
  };

  //Delete_Lab
  const deleteLab = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/labsdata/${id}`, { method: "DELETE" });
      setLabsData(labsData.filter((item) => item.id !== id));
    }
  };

  //Add New lab
  const addLab = async (newLab) => {
    const response = await fetch("/labsdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLab),
    });
    const data = await response.json();
    setLabsData([data, ...labsData]);
  };

  const labEdit = (room) => {
    setEditLab({
      room,
      edit: true,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        labsData,
        deleteLab,
        addLab,
        labEdit,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
