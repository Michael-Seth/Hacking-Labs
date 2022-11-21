import React, { useState } from "react";
import "./dashboard.css";
import Sidebar from "../../components/Sidebar";
import DashNavbar from "../../components/DashNavbar";
import Labs from "../../components/Labs";
import Leaderboard from "../../components/Leaderboard";
import DashboardHome from "../../components/DashboardHome";
import DownloadVPN from "../../components/DownloadVPN";
import Settings from "../../components/Settings";
// import AdminMessage from "../../components/AdminMessage";
//import Machine from "../../components/Machine";
import CreateLab from "../../admin/CreateLab";
import CreateMaterials from "../../admin/CreateMaterials";
//import { Route, Routes } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");

  //  Functions to handle Tab Switching
  const handleTab = (event) => {
    // update the state to tab1
    setActiveTab(event);
  };
  let screen;

  if (activeTab === "tab1") {
    screen = <DashboardHome />;
  }
  if (activeTab === "leadersboard") {
    screen = <Leaderboard />;
    console.log(activeTab);
  }
  if (activeTab === "tab3") {
    screen = <Labs />;
  }
  if (activeTab === "tab4") {
    screen = <DownloadVPN />;
  }
  if (activeTab === "tab5") {
    screen = <Settings />;
  }
  if (activeTab === "tab6") {
    screen = <CreateLab />;
  }
  if (activeTab === "tab7") {
    screen = <CreateMaterials />;
  }
  return (
    <>
      <DashNavbar handleTab={handleTab} />
      <main>
        <div className="grid">
          <Sidebar activeTab={activeTab} handleTab={handleTab} />
          <div className="flex-two">
            {/* <Routes>
              <Route path={`/dashboard/${activeTab}`} element={screen} />
            </Routes> */}
            {screen}
            {/* <Machine /> */}
          </div>
          {/* <div className="flex-three">
            <div className="box right-sidebar-up">
              <h6>Introduction to Linux</h6>
              <div className="recent-img">&nbsp;</div>
              <p className="recent-excerpt">
                In order to complete the labs, kindly download your VPN file and
                connect. Then you can access the machine using its IP.
              </p>
              <button className="recent-button">Read more...</button>
            </div>
            <AdminMessage />
          </div> */}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
