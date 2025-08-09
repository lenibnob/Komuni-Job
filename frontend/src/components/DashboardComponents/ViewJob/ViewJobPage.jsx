import "@/css/DashboardCSS/ViewJob.css";
import { useState, useEffect } from 'react';
import { getJobUrl, BASE_URL, applyJob } from "@/endpoints/api";
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function ViewJobPage() {
    const [data, setData] = useState({});
    const [jobCategory, setJobCategory] = useState("");
    const VIEW_JOB_URL = getJobUrl();
    const [applied, setApplied] = useState(false);
    const [applicantId, setApplicantid] = useState(0);
    const [applicant, setApplicant] = useState({
        job_id: 0,
        applicant_id: 0
    });

    useEffect(() => {
        fetch(`${BASE_URL}/api/accounts/get-user/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setApplicantid(data))
        .catch(err => console.error("Fetch error: ", err));     
    }, [])

    useEffect(() => {
        fetch(VIEW_JOB_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setData(data))
        .catch(err => console.error("Fetch error: ", err)); 
    }, []);

    useEffect(() => {
        if(!data.job_category) return;
        fetch(`${BASE_URL}api/job-categories/${data.job_category}/`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(pk => setJobCategory(pk.job_cat_name))
        .catch(err => console.error("Fetch error: ", err)); 
    }, [data.job_category]);

    const handleApplication = async (e) => {
        const backEndData = {
            job_id: data.job_id,
            applicant_id: applicantId.id
        }

        if(await applyJob(backEndData)){
            alert("Job Applied");
        }
        else {
            alert("Error on applying job");
        }
    }

    function DisplayJob({ data }) {
        return (
            
            <div className="viewJobPage">
                <div className="applyHeader">
                    <div className="rowThis">
                        <Link className="returnButton" to="/dashboard">
                            <button className="returnButton">
                                <IoArrowBackCircleOutline />
                            </button>
                        </Link>
                        <p>Return to dashboard</p>
                    </div>

                    <button
                        className={`applyButton ${applied ? "appliedButton" : ""}`}
                        onClick={() => {
                            setApplied(true); 
                            handleApplication();}}
                        disabled={applied}
                    >
                        {applied ? "Applied" : "Apply"}
                    </button>
                </div>
                <div className="jobFile">
                    <div className="viewJobInfo">
                        <div className="jobUserInfo">
                            <div className="jobUserProfile">
                                <div className="jobUserProfileImage"></div>
                                <div className="jobUserName">
                                    <h2>{data.employer?.first_name}</h2>
                                    <h2 className="jobUserTier">Tier 1</h2>
                                </div>
                            </div>
                            <h3>
                                ({data.employer?.is_verified ? "✓" : "X"}) {data.employer?.is_verified ? "Approved" : "Not Approved"} Employer
                            </h3>
                        </div>

                        <div className="viewJobDetails">
                            <h1>{data.job_title}</h1>
                            <h3 className="job_hiring_count">Hiring {data.hiring_count} people</h3>
                            <h2>Job Category</h2>
                            <h3 className="job_category">{jobCategory}</h3>
                            <h2>Location</h2>
                            <h3 className="job_location">{data.city}, {data.province}</h3>

                            <h2>Job Tags</h2>
                            <div className="jobTags">
                                {data.job_tags}
                            </div>
                            <h2>{data.payment_option_type} pay of {data.payment_amount}</h2>
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
            </div>
        );
    }

    return (
        <>
            <DisplayJob data={data}/>
        </>
    )
}
