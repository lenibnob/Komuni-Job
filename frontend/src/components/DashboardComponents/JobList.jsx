import SearchBar from "@/components/DashboardComponents/SearchBar";
import { useState } from "react";
import { Link } from 'react-router-dom';
 
export default function JobList () {

    const [tempData, setTempData] = useState([
        {
            id: 1,
            title: "Frontend Developer",
            description: "We need someone to build the frontend page of our website",
            location: "Germany", 
            timePost: "1945"
        },
        {
            id: 2,
            title: "Backend Engineer",
            description: "We need someone to bridge our frontend and backend data",
            location: "Twin Towers",
            timePost: "2001"
        }
    ]);

    function JobPost({data}) {
        return (
            <div className="jobPost">
                <div className="jobImage">
                    <h2>{data.title}</h2>
                </div>
                <div className="jobDetails">
                    <div className="jobIntro">
                        <p>{data.description}</p>
                    </div>
                    <div className="jobStatusContainer">
                        <div className="jobStatus">
                            <p>{data.location}</p>
                            <p>{data.timePost}</p>
                        </div>
                        <Link><button className="viewButton">View</button></Link>
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
                                <JobPost key={job.id} data={job} />
                            ))
                        ) : (
                            <p>No job posts available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}