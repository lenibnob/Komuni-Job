import { useState } from "react";
import "@/css/DashboardCSS/PendingApplicants.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import DeleteHeader from "@/components/DashboardComponents/PendingApplicants/DeleteHeader";
import DisplayJob from "@/components/DashboardComponents/ViewJob/DisplayJob";
import JobApplicants from "@/components/DashboardComponents/PendingApplicants/JobApplicants";

export default function PendingApplicants() {
    const [data] = useState([{
        user: 'Employer Name',
        title: 'Accounting',
        hiring_count: '10',
        job_category: 'Public Works',
        location: 'Brgy santo. Sta Rosa',
        job_tags: ['Entry-Level', 'Clerical Work'],
        hourly_pay: '$100',
        job_duration: '2',
        posted_time: '30 mins ago',
        job_expiry: 'July 30, 2025',
        description: 'Lorem ipsum I forgot the rest of the fake latin canva description :('
    }]);

    return (
        <div className="pendingApplicantsPage">
            <DashboardNav/>
            <div className="pendingApplicants">
                <DeleteHeader />
                <DisplayJob job={data[0]}/>
                <div className="jobApplicants"></div>
                <JobApplicants />
            </div>
        </div>
    );
}
