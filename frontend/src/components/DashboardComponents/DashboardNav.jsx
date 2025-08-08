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
                <NavLink to="/"><LuHouse className="jobListingButton"/></NavLink>
                <NavLink to="/"><FiBriefcase className="jobPostedButton" /></NavLink>
                <NavLink to="/dashboard/postjob"><FaRegPlusSquare className="createButton" /></NavLink>
                <NavLink to="/userprofile"><FiUser className="profileButton" /></NavLink>
                <NavLink to="/dashboard/inbox"><MdMailOutline className="inboxButton"/></NavLink>
            </div>
            <NavLink to="/"><GoGear className="settingsButton"/></NavLink>
        </div>
    );
}