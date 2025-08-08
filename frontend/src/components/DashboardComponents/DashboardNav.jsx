import "@/css/DashboardCSS/DashboardNav.css"
import { LuHouse } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { Link } from "react-router-dom";

export default function DashboardNav () {
    return (
        <div className="dashboardNav">
            <Link to="/dashboard"><div className="dashboardLogo"></div></Link>
            <div className="dashboardButtonRow">
                <Link to="/"><LuHouse className="jobListingButton"/></Link>
                <Link to="/"><FiBriefcase className="jobPostedButton" /></Link>
                <Link to="/dashboard/postjob"><FaRegPlusSquare className="createButton" /></Link>
                <Link to="/userprofile"><FiUser className="profileButton" /></Link>
                <Link to="/dashboard/inbox"><MdMailOutline className="inboxButton"/></Link>
            </div>
            <Link to="/"><GoGear className="settingsButton"/></Link>
        </div>
    );
}