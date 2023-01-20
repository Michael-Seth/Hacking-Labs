import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import Sidebar from "../../components/Sidebar";
import DashNavbar from "../../components/DashNavbar";
import { Outlet } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

/** */

function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");
   const { user, checkUser, checkAdmin } = useContext(GlobalContext);

  useEffect(() => {
    checkUser();
    checkAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //  Functions to handle Tab Switching
  const handleTab = (event) => {
    // update the state to tab1
    setActiveTab(event);
  };

  if (user)
    return (
      <>
        <DashNavbar handleTab={handleTab} />
        <main>
          <div className="grid">
            <Sidebar activeTab={activeTab} handleTab={handleTab} />
            <div className="flex-two">
              <Outlet />
            </div>
          </div>
        </main>
      </>
    );
}

export default Dashboard;
