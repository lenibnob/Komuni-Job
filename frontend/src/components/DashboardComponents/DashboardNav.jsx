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
            <Link to="/"><div className="dashboardLogo"></div></Link>
            <div className="dashboardButtonRow">
                {/*replace these divs with Links later*/}
                <Link to="/"><LuHouse className="jobListingButton"/></Link>
                <Link to="/"><FaRegPlusSquare   className="createButton" /></Link>
                <Link to="/"><FiBriefcase className="jobPostedButton" /></Link>
                <Link to="/"><FiUser className="profileButton" /></Link>
                <Link to="/"><MdMailOutline  className="inboxButton"/></Link>
            </div>
            <Link to="/"><GoGear className="settingsButton"/></Link>
        </div>
    );
}