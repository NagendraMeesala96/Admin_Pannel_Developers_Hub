import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Employee from "./Components/Users/Employee";
import Dashboard from "./Components/Dashboard";
import Client from "./Components/Users/Client";
import ProjectPosts from "./Components/Posts/ProjectPosts";
import AllBids from "./Components/Bids/AllBids";
import AllReviews from "./Components/Reviews/AllReviews";
import Profile from "./Components/Profile/Profile";
import LogIn from "./Components/LogIn";
import MyProjectPosts from "./Components/Client/MyProjectPosts";
import OthersProfile from "./Components/Profile/OthersProfile";
import MyProjectBids from "./Components/Client/MyProjectBids";

function App() {
  const ProtectedRoute = (props) => {
    const token = localStorage.getItem("token");
    const hasLoggedIn = token ? true : false;
    if (hasLoggedIn) return props.children;
    return <Navigate to="/LogIn" />;
  };

  const UnProtectedRoute = (props) => {
    const token = localStorage.getItem("token");
    const hasLoggedIn = token ? true : false;
    if (hasLoggedIn) return <Navigate to="/Dashboard" />;
    return props.children;
  };
  return (
    <div className="App bg-img">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UnProtectedRoute>
                <LogIn />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/LogIn"
            element={
              <UnProtectedRoute>
                <LogIn />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Employee"
            element={
              <ProtectedRoute>
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Client"
            element={
              <ProtectedRoute>
                <Client />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProjectPosts"
            element={
              <ProtectedRoute>
                <ProjectPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllBids"
            element={
              <ProtectedRoute>
                <AllBids />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllReviews"
            element={
              <ProtectedRoute>
                <AllReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile/:userType/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyProjectPosts"
            element={
              <ProtectedRoute>
                <MyProjectPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ClientProfile/:userType/:id"
            element={
              <ProtectedRoute>
                <OthersProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyProjectBids/:id"
            element={
              <ProtectedRoute>
                <MyProjectBids />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
