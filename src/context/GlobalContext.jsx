import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [labsData, setLabsData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [labEdit, setLabEdit] = useState({
    room: {},
    edit: false,
  });
  const [machineEdit, setMachineEdit] = useState({
    machine: {},
    edit: false,
  });

  const [user, setUser] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  //For Admin
  const [adminUser, setAdminUser] = useState(true);

  //Handle LogOut
  //const navigate = useNavigate();
  const logOut = () => {
    setAdminUser(false);
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  useEffect(() => {
    fetchMachine();
  }, []);

  const fetchLabs = async () => {
    const response = await fetch(
      `https://637a3eb07419b414df9d0572.mockapi.io/labsMachine?_sort=id&_order=desc`
    );
    const data = await response.json();
    setLabsData(data);
    setIsLoading(false);
  };

  //Fetch_Machine
  const fetchMachine = async () => {
    const response = await fetch(
      `https://637a3eb07419b414df9d0572.mockapi.io/labtasks?_sort=id&_order=desc`
    );
    const mData = await response.json();
    setMachineData(mData);
    setIsLoading(false);
  };

  //Delete_Lab
  const deleteLab = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(
        `https://637a3eb07419b414df9d0572.mockapi.io/labsMachine/${id}`,
        { method: "DELETE" }
      );
      setLabsData(labsData.filter((item) => item.id !== id));
    }
  };

  //Delete_Machine
  const deleteMachine = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(
        `https://637a3eb07419b414df9d0572.mockapi.io/labtasks/${id}`,
        { method: "DELETE" }
      );
      setMachineData(machineData.filter((item) => item.id !== id));
    }
  };

  //Add New lab
  const addLab = async (newLab) => {
    const response = await fetch(
      "https://637a3eb07419b414df9d0572.mockapi.io/labsMachine",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLab),
      }
    );
    try {
      const data = await response.json();
      setLabsData([data, ...labsData]);
      toast.success("Lab Added Successfully");
    } catch (error) {
      toast.error(error, "Lab not created");
    }
  };

  //Add New Machine
  const addMachine = async (newMachine) => {
    const response = await fetch(
      "https://637a3eb07419b414df9d0572.mockapi.io/labtasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMachine),
      }
    );
    try {
      const data = await response.json();
      setMachineData([data, ...machineData]);
      toast.success("Machine Added Successfully");
    } catch (error) {
      toast.error(error, "Machine not created");
    }
  };

  //UPDATE Lab
  const editLab = (room) => {
    setLabEdit({
      room,
      edit: true,
    });
  };

  //UPDATE Machine
  const editMachine = (machine) => {
    setMachineEdit({
      machine,
      edit: true,
    });
  };

  //Update_Labs but it adds a new Item
  const updateLab = async (id, upIdLab) => {
    const response = await fetch(
      `https://637a3eb07419b414df9d0572.mockapi.io/labsMachine/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upIdLab),
      }
    );

    const data = await response.json();

    setLabsData(
      labsData.map((room) => (room.id === id ? { ...room, ...data } : room))
    );
  };

  //Update_Machine but it adds a new Item
  const updateMachine = async (id, upIdMachine) => {
    const response = await fetch(
      `https://637a3eb07419b414df9d0572.mockapi.io/labtasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upIdMachine),
      }
    );

    const data = await response.json();

    setMachineData(
      machineData.map((machine) =>
        machine.id === id ? { ...machine, ...data } : machine
      )
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        labsData,
        machineData,
        deleteLab,
        addLab,
        editLab,
        isLoading,
        labEdit,
        editMachine,
        updateLab,
        addMachine,
        machineEdit,
        deleteMachine,
        updateMachine,
        adminUser,
        logOut,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
//linear-gradient(270deg, rgb(19, 173, 199) 0%, rgb(148, 93, 214) 100%)
