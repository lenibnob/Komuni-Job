import "@/css/DashboardCSS/ViewJob.css";
import ApplyHeader from "@/components/DashboardComponents/ViewJob/ApplyHeader";
import DisplayJob from "@/components/DashboardComponents/ViewJob/DisplayJob";
import { useState } from 'react';

export default function ViewJobPage() {
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
        <div className="viewJobPage">
            <ApplyHeader />
            <DisplayJob job={data[0]} />
        </div>
    );
}
