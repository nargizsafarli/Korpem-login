// src/components/Dashboard.jsx
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import "./Dashboard.css"


const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);


  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
 

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome Our Application!!!</h2>
        <p>You have successfully logged in to the application.</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
