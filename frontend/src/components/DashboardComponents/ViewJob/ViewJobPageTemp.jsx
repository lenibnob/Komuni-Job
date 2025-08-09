import "@/css/DashboardCSS/ViewJob.css";
import { useState, useEffect } from 'react';
import { getJobUrl, BASE_URL, applyJob } from "@/endpoints/api";
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import DisplayJob from "@/components/DashboardComponents/ViewJob/DisplayJob";

export default function ViewJobPageTemp() {
    const [data, setData] = useState({});
    const [jobCategory, setJobCategory] = useState("");
    const VIEW_JOB_URL = getJobUrl();
    const [applied, setApplied] = useState(false);
    const [applicantId, setApplicantid] = useState(0);

    useEffect(() => {
        fetch(`${BASE_URL}/api/accounts/get-user/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(user => setApplicantid(user.owner_id))
        .catch(err => console.error("Fetch error: ", err));     
    }, []);

    useEffect(() => {
        fetch(VIEW_JOB_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(jobData => setData(jobData))
        .catch(err => console.error("Fetch error: ", err)); 
    }, []);

    useEffect(() => {
        if(!data.job_category) return;
        fetch(`${BASE_URL}api/job-categories/${data.job_category}/`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(pk => setJobCategory(pk.job_cat_name))
        .catch(err => console.error("Fetch error: ", err)); 
    }, [data.job_category]);

    const handleApplication = async () => {
        const backEndData = {
            job_id: data.job_id,
            applicant_id: applicantId.id
        };
        if(await applyJob(backEndData)){
            alert("Job Applied");
            setApplied(true);
        }
        else {
            alert("Error on applying job");
        }
    };

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
                    onClick={handleApplication}
                    disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>

            {/* Pass backend data straight into DisplayJob */}
            <DisplayJob data={{ ...data, job_category: jobCategory || data.job_category }} />
        </div>
    );
}
