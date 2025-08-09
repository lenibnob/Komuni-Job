import React from "react";
import "@/css/DashboardCSS/DisplayJob.css";

export default function DisplayJob({ job }) {
    return (
        <div className="jobFile">
            <div className="viewJobInfo">
                <div className="jobUserInfo">
                    <div className="jobUserProfile">
                        <div className="jobUserProfileImage"></div>
                        <div className="jobUserName">
                            <h2>{job.user}</h2>
                            <h2 className="jobUserTier">Tier 1</h2>
                        </div>
                    </div>
                    <h3>( ✓ ) Approved Employer</h3>
                </div>

                <div className="viewJobDetails">
                    <h1>{job.title}</h1>
                    <h3 className="job_hiring_count">Hiring {job.hiring_count} people</h3>
                    <h2>Job Category</h2>
                    <h3 className="job_category">{job.job_category}</h3>
                    <h2>Location</h2>
                    <h3 className="job_location">{job.location}</h3>

                    <h2>Job Tags</h2>
                    <div className="jobTags">
                        {job.job_tags.map((tag, index) => (
                            <h3 key={index}>{tag}</h3>
                        ))}
                    </div>
                    <h2>Hourly pay of {job.hourly_pay}</h2>
                    <h2>{job.job_duration} day job</h2>
                </div>

                <div className="jobTimePosted">
                    <h2>Posted {job.posted_time}</h2>
                    <h2>Deadline by {job.job_expiry}</h2>
                </div>
            </div>

            <div className="viewJobDescription">
                <div className="jobFileImage"></div>
                <h2>Job Description</h2>
                <h2>{job.description}</h2>
            </div>
        </div>
    );
}
