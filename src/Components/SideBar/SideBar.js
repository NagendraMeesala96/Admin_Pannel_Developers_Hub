import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/LogIn");
  };
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Developers Hub
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/LogIn" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <LoginIcon /> &nbsp;&nbsp;&nbsp;LogIn
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/Dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/MyProjectPosts" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                MyProjects
              </CDBSidebarMenuItem>
            </NavLink>

            <hr />
            <p className="text-center">Admin</p>
            <hr />
            <NavLink exact to="/Employee" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Employees</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Client" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Clients</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ProjectPosts" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                All Project Posts
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/AllBids" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                All Bids
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AllReviews" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                All Reviews
              </CDBSidebarMenuItem>
            </NavLink>
            <hr />
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            <button
              className="btn btn-outline-white text-white"
              onClick={logOutHandler}
            >
              <LogoutIcon /> LogOut
            </button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
