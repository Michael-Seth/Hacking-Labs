import React from "react";
import userImg from "../assets/img/young woman wearing smart watch and using laptop.png";
import homeIcon from "../assets/img/House Graph by Streamlinehq.png";
import labsIcon from "../assets/img/Suitcase by Streamlinehq.png";
import pendingIcon from "../assets/img/Todo List by Streamlinehq.png";

function DashboardHome() {
  return (
    <div className="active" id="dashboard" data-tab-content>
      <div className="box head">
        <div className="dashboard-head">
          <h5>Dashboard</h5>
          <h3>Hello Michael!</h3>
          <p>Good to see you again...</p>
        </div>
        <div className="dashboard-img">
          <img src={userImg} alt="cysec-users" />
        </div>
      </div>
      <div className="box main">
        <div className="dashboard-head">
          <h5>Overview</h5>
        </div>
        <div className="main-dashboard">
          <div className="main-item">
            <div className="main-flex-left">
              <h4>Labs Available</h4>
              <h3>38</h3>
              <p>
                <span>&#x2191;</span>Total rooms
              </p>
              Visit
            </div>
            <div className="main-flex-right">
              <img src={homeIcon} alt="icon" />
            </div>
          </div>
          <div className="main-item">
            <div className="main-flex-left">
              <h4>Labs Completed</h4>
              <h3>0</h3>
              <p>
                <span>&#x2191;</span>Total completed labs
              </p>
              Visit
            </div>
            <div className="main-flex-right">
              <img src={labsIcon} alt="icon" />
            </div>
          </div>
          <div className="main-item">
            <div className="main-flex-left">
              <h4>Pending</h4>
              <h3>38</h3>
              <p>
                <span>&#x2191;</span>Total pending labs
              </p>
              Visit
            </div>
            <div className="main-flex-right">
              <img src={pendingIcon} alt="icon" />
            </div>
          </div>
        </div>
        <div className="recent-labs">
          <div className="dashboard-head">
            <h5>Recently Completed</h5>
          </div>
          <div className="table">
            <div className="head-row">
              <h5>Rooms</h5>
              <h5>Status</h5>
            </div>
            <div className="content-row">
              <div className="name-row">
                <p>Introduction to Linux</p>
                <span>Completed &nbsp; &#x2713;</span>
              </div>
              <div className="name-row">
                <p>Introduction to Linux</p>
                <span>Completed &nbsp; &#x2713;</span>
              </div>
              <div className="name-row">
                <p>Introduction to Linux</p>
                <span>Completed &nbsp; &#x2713;</span>
              </div>
              <div className="name-row">
                <p>Introduction to Linux</p>
                <span>Completed &nbsp; &#x2713;</span>
              </div>
              <div className="name-row">
                <p>Introduction to Linux</p>
                <span>Completed &nbsp; &#x2713;</span>
              </div>
              <div className="name-row">
                <p>Introduction to Linux</p>
                <span>Completed &nbsp; &#x2713;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;