import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import dashboardStyles from "./Dashboard.module.css";

const Dashboard = () => {
    const {user} = useAuthContext();
    
    return (
        <div className={dashboardStyles.dashboardContainer}>
            <h1>Welcome back, {user.email}</h1>
        </div>
    )
}

export default Dashboard;
