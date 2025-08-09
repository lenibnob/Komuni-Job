import SearchBar from "@/components/DashboardComponents/Dashboard/SearchBar";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { setViewJobUrl, goToJob} from "@/endpoints/api";
 
export default function JobList () {

    const [tempData, setTempData] = useState([]);
    const [timePosted, setTimePosted] = useState("");
    const [search, setSearch] = useState("");
    const time = new Date();

    useEffect(() => {
        fetch("http://localhost:8000/api/jobs/card-list/", {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setTempData(data))
        .catch(err => console.error("Fetch error: ", err))
    }, []);

    function JobPost({data}) {
        return (
            <div className="jobPost">
                <div className="jobImage">
                    <h2>{data.job_title}</h2>
                </div>
                <div className="jobDetails">
                    <div className="jobIntro">
                        <p>{data.short_description}</p>
                    </div>
                    <div className="jobStatusContainer">
                        <div className="jobStatus">
                            <p>{data.city} {data.province}</p>
                            <p>{data.job_post_date}</p>
                        </div>
                        <Link to="/dashboard/viewjob"><button onClick={() => {setViewJobUrl(goToJob(data.job_id))}} className="viewButton">View</button></Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="jobList">
                <SearchBar />
                <div className="jobContainer">
                    <div className="jobHeader">
                        <h1>Job Listing</h1>
                        <hr />
                    </div>
                    <div className="jobPostContainer">
                       {tempData.length > 0 ? (
                            tempData.map((job) => (
                                <JobPost key={job.job_id} data={job} />
                            ))
                        ) : (
                            <p style={{color: "black"}}>No job posts available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}