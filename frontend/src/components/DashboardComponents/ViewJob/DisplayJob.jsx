import React from "react";
import "@/css/DashboardCSS/DisplayJob.css";

export default function DisplayJob({ data }) {
    return (
        <div className="jobFile">
            <div className="viewJobInfo">
                <div className="jobUserInfo">
                    <div className="jobUserProfile">
                        <div className="jobUserProfileImage"></div>
                        <div className="jobUserName">
                            <h2>{data.employer?.first_name || "Unknown"}</h2>
                            <h2 className="jobUserTier">Tier 1</h2>
                        </div>
                    </div>
                    <h3>
                        ({data.employer?.is_verified ? "✓" : "X"}){" "}
                        {data.employer?.is_verified ? "Approved" : "Not Approved"} Employer
                    </h3>
                </div>

                <div className="viewJobDetails">
                    <h1>{data.job_title}</h1>
                    <h3 className="job_hiring_count">Hiring {data.hiring_count} people</h3>

                    <h2>Job Category</h2>
                    <h3 className="job_category">{data.job_category}</h3>

                    <h2>Location</h2>
                    <h3 className="job_location">
                        {data.city}, {data.province}
                    </h3>

                    <h2>Job Tags</h2>
                    <div className="jobTags">
                        {Array.isArray(data.job_tags)
                            ? data.job_tags.map((tag, i) => <h3 key={i}>{tag}</h3>)
                            : data.job_tags}
                    </div>

                    <h2>
                        {data.payment_option_type} pay of {data.payment_amount}
                    </h2>
                    {data.job_duration && <h2>{data.job_duration} day job</h2>}
                </div>

                <div className="jobTimePosted">
                    <h2>Posted {data.job_post_date}</h2>
                    <h2>Deadline by {data.job_expire_date}</h2>
                </div>
            </div>

            <div className="viewJobDescription">
                <div className="jobFileImage"></div>
                <h2>Job Description</h2>
                <h2>{data.job_description}</h2>
            </div>
        </div>
    );
}
