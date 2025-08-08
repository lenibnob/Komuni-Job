import "@/css/DashboardCSS/Inbox.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import { MdMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";

export default function InboxPage() {

    function AppliedJob() {
        return (
            <div className="appliedJob">
                <div className="appliedJobTitle">
                    <h2>data goes here</h2>
                </div>
                <div className="appliedJobViewContainer">
                    <HiOutlinePhone className="employerProfileNumber"/>
                    <MdMailOutline className="employerProfileEmail"/>
                    <div className="employerImage"></div>
                    <h2>Employer</h2>
                    <button className="appliedJobViewButton">View Profile</button>
                </div>
            </div>           
        )
    }

    return (
        <div className="inboxPage">
            <DashboardNav />
            <div className="appliedJobsContainer">
                <div className="appliedJobs">
                    <div className="appliedJobsHeader"><h2>APPLIED JOBS</h2></div>
                    <div className="appliedJobsList">
                        <AppliedJob/ >
                        <AppliedJob/ >
                        <AppliedJob/ >
                    </div>
                </div>
            </div>
        </div>
    )
}