import React, { createContext, useEffect, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [labsData, setLabsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [labEdit, setLabEdit] = useState({
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

  const editLab = (room) => {
    setLabEdit({
      room,
      edit: true,
    });
  };

  //Update_Labs but it adds a new Item
  const updateLab = async (id, upIdLab) => {
    const response = await fetch(`/labsdata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upIdLab),
    });

    const data = await response.json();

    setLabsData(
      labsData.map((room) => (room.id === id ? { ...room, ...data } : room))
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        labsData,
        deleteLab,
        addLab,
        editLab,
        isLoading,
        labEdit,
        updateLab,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
