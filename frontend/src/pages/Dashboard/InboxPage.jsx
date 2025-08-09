import "@/css/DashboardCSS/Inbox.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import { MdMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";
import {useState, useEffect} from 'react'

export default function InboxPage() {
    const [job, setJob] = useState([{}]);
    const [owner, setOwner] = useState([{}]);
    const [ownerName, setOwnerName] = useState([{}]);

    useEffect(() => {
    fetch("http://localhost:8000/api/job/employer-detail/", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => setOwner(data.job))
    .catch(err => console.error("Fetch error: ", err));
    }, []);

    useEffect(() => {
    fetch("http://localhost:8000/api/job/short-detail/", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => setJob(data.job_detail))
    .catch(err => console.error("Fetch error: ", err));
    }, []);
    
    useEffect(() => {
        fetch(`http://localhost:8000/api/accounts/get-user/${1}/`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
        })
        .then(data => setOwnerName(data.job_owner))
        .catch(err => console.error("Fetch error: ", err));
    }, []);

    function AppliedJob({data}) {
        return (
            <div className="appliedJob">
                <div className="appliedJobTitle">
                    <h2>{data.job_title}</h2>
                </div>
                <div className="appliedJobViewContainer">
                    <HiOutlinePhone className="employerProfileNumber"/>
                    <MdMailOutline className="employerProfileEmail"/>
                    <div className="employerImage"></div>
                    <h2>{ownerName?.first_name}</h2>
                    <button className="appliedJobViewButton">View Profile</button>
                </div>
            </div>           
        )
    }

    return (
        <div className="inboxPage">
            <DashboardNav />
            <div className="appliedJobsContainer">
                <div className="appliedJobs">
                    <div className="appliedJobsHeader"><h2>APPLIED JOBS</h2></div>
                    <div className="appliedJobsList">
                        {job?.length > 0 ? (
                            job.map((list, index) => (
                                <AppliedJob key={index} data={list} />
                            ))
                        ) : (
                            <p style={{color: "black"}}>No job applied.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}