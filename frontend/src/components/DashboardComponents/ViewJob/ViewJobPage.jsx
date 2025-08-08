import "@/css/DashboardCSS/ViewJob.css";
import ApplyHeader from "@/components/DashboardComponents/ViewJob/ApplyHeader";
import { useState } from 'react';

export default function ViewJobPage() {
    const [data, setData] = useState([{
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
        desription: 'Lorem ipsum I forgot the rest of the fake latin canva description blah blah'
    }]);

    // Capitalized component name
    function DisplayJob({ data }) {
        return (
            <div className="viewJobPage">
                <ApplyHeader />
                <div className="jobFile">
                    <div className="viewJobInfo">
                        <div className="jobUserInfo">
                            <div className="jobUserProfile">
                                <div className="jobUserProfileImage"></div>
                                <div className="jobUserName">
                                    <h2>{data.user}</h2>
                                    <h2 className="jobUserTier">Tier 1</h2>
                                </div>
                            </div>
                            <h3>( ✓ ) Approved Employer</h3>
                        </div>

                        <div className="viewJobDetails">
                            <h1>{data.title}</h1>
                            <h3 className="job_hiring_count">Hiring {data.hiring_count} people</h3>
                            <h2>Job Category</h2>
                            <h3 className="job_category">{data.job_category}</h3>
                            <h2>Location</h2>
                            <h3 className="job_location">{data.location}</h3>

                            <h2>Job Tags</h2>
                            <div className="jobTags">
                                {data.job_tags.map((tag, index) => (
                                    <h3 key={index}>{tag}</h3>
                                ))}
                            </div>
                            <h2>Hourly pay of {data.hourly_pay}</h2>
                            <h2>{data.job_duration} day job</h2>
                        </div>
                        <div className="jobTimePosted">
                            <h2>Posted {data.posted_time}</h2>
                            <h2>Deadline by {data.job_expiry}</h2>
                        </div>
                    </div>
                    <div className="viewJobDescription">
                        <div className="jobFileImage"></div>
                        <h2>Job Description</h2>
                        <h2>{data.desription}</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <DisplayJob data={data[0]} />
        </>
    );
}
