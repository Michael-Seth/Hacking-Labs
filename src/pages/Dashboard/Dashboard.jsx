import React, { useState } from "react";
import "./dashboard.css";
import Sidebar from "../../components/Sidebar";
import DashNavbar from "../../components/DashNavbar";
import { Outlet } from "react-router-dom";
import DashboardHome from "../../components/DashboardHome";
//import { Route, Routes } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");

  //  Functions to handle Tab Switching
  const handleTab = (event) => {
    // update the state to tab1
    setActiveTab(event);
  };

  return (
    <>
      <DashNavbar handleTab={handleTab} />
      <main>
        <div className="grid">
          <Sidebar activeTab={activeTab} handleTab={handleTab} />
          {/* <div className="flex-two">{screen}</div> */}
          <div className="flex-two">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
