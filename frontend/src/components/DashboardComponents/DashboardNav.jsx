import "@/css/DashboardCSS/DashboardNav.css"
import { useState } from "react";
import { LuHouse } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { logout } from "@/endpoints/api";

export default function DashboardNav () {
    const [isVisible, setIsVisible] = useState(false);

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
            <div>
                <button className={`settingsButton ${isVisible ? "active" : ""}`} onClick={() =>  setIsVisible(!isVisible)}>
                    <GoGear className={`settingsButton ${isVisible ? "active" : ""}`}/>
                </button>
                {isVisible && (
                    <div className="settingsPopUp">
                            <NavLink className="settingsPopUpTop" to='/settings'>
                                <GoGear className="settingsPopUpIcon"/>
                                <h1>User Settings</h1>
                            </NavLink>
                        <NavLink className="settingsPopUpBottom" onClick={logout} to='/' end>
                            <LuLogOut  className="settingsPopUpIcon"/>
                            <h1>Sign Out</h1>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}