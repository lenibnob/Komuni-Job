import "@/css/DashboardCSS/DashboardNav.css"
import { LuHouse } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { NavLink } from "react-router-dom";

export default function DashboardNav () {
    return (
        <div className="dashboardNav">
            <NavLink to="/dashboard"><div className="dashboardLogo"></div></NavLink>
            <div className="dashboardButtonRow">
                <NavLink to="/dashboard" end>
                    {({ isActive }) => (
                        <LuHouse className={`jobListingButton ${isActive ? "active" : ""}`}/>
                    )}
                </NavLink>
                <NavLink to="/"><FiBriefcase className="jobPostedButton" /></NavLink>
                <NavLink to="/dashboard/postjob" end>
                    {({ isActive }) => (
                        <FaRegPlusSquare 
                            className={`createButton ${isActive ? "active" : ""}`} 
                        />
                    )}
                </NavLink>
                <NavLink to="/userprofile" end>
                    {({ isActive }) => (
                        <FiUser className={`profileButton ${isActive ? "active" : ""}`} />
                    )}
                </NavLink>
                <NavLink to="/dashboard/inbox" end>
                    {({ isActive }) => (
                        <MdMailOutline className={`inboxButton ${isActive ? "active" : ""}`}/>
                    )}
                </NavLink>
            </div>
            <NavLink to="/"><GoGear className="settingsButton"/></NavLink>
        </div>
    );
}