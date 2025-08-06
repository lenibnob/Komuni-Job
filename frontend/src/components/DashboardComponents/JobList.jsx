import SearchBar from "@/components/DashboardComponents/SearchBar";
import { Link } from 'react-router-dom';
 
export default function JobList () {

    function JobPost({data}) {
        return (
            <div className="jobPost">
                <div className="jobImage"></div>
                <div className="jobDetails">
                    <div className="jobIntro">
                        <p>this text should come from the database</p>
                    </div>
                    <div className="jobStatusContainer">
                        <div className="jobStatus">
                            <p>Location</p>
                            <p>X hours ago</p>
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
                        <JobPost />
                        <JobPost />
                        <JobPost />
                        <JobPost />
                        <JobPost />
                    </div>
                </div>
            </div>
        </>
    );
}