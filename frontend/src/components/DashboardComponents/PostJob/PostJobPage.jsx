import "@/css/DashboardCSS/PostJob.css";
import PostHeader from "@/components/DashboardComponents/PostJob/PostHeader";
import {useState, useEffect} from 'react';
import postJob from '@/endpoints/api'

export default function PostJobPage() {
    const [jobCategory, setJobCategory] = useState([]);
    const [jobSkills, setJobSkills] = useState([]);
    const [jobTags, setJobTags] = useState([]);
    const [jobDetail, setJobDetail] = useState([{
        job_title: "",
        payment_option: "",
        job_category: "",
        job_skills: [""],
        //job_hiring_amount: "",
        //job_cost_per_hour: "",
        payment_amount: "",
        job_descritpion: "",
        job_expire_date: "",
        address: "",
        barangay: "",
        city: "",
        province: ""
    }]);

    useEffect(() => {
        const token = localStorage.getItem("access_key");

        fetch("http://127.0.0.1:8000/api/job-categories/", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setJobCategory(data))
        .catch(err => console.error("Fetch error: ", err)); 
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_key");

        fetch("http://127.0.0.1:8000/api/job-skills/", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setJobSkills(data))
        .catch(err => console.error("Fetch error: ", err)); 
    }, []);
    


    return (
        <div className="postJobContainer">
            <PostHeader />

            <div className="postJobForm">
                
                <div className="jobPost-formLeft">
                    <label>
                        Job post title
                        <input type="text" placeholder="Enter job title" />
                    </label>

                    <label>
                        Job Category
                        <select value={jobDetail.job_category} onChange={(e) => jobDetail.job_category = e.target.value}>
                            <option value="">Select a job category</option>
                            {jobCategory.map(category => (
                                <option key={category.job_cat_id} value={category.job_cat_name}>
                                    {category.job_cat_name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Payment Option
                        <select>
                        <option>Select option</option>
                        <option>Hourly</option>
                        <option>Fixed</option>
                        </select>
                    </label>

                    <label>
                        Required skill
                        <select value={jobDetail.job_skills} onChange={(e) => jobDetail.job_skills = e.target.value}>
                            <option value="">Select job skill requirements</option>
                            {jobSkills.map(category => (
                                <option key={category.job_skill_id} value={category.job_skill_name}>
                                    {category.job_skill_name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Hiring amount
                        <input type="number" />
                    </label>

                    <label>
                        Cost per hour
                        <div className="jobPost-costInput">
                        <span>₱</span>
                        <input type="number" />
                        </div>
                        <small>Total Cost: ₱100.00</small>
                    </label>
                    </div>

                    <div className="jobPost-formRight">
                    <label>
                        Description
                        <p>Provide a brief and concise job description</p>
                        <textarea />
                        <div className="jobPost-formattingBar">
                        <button><b>B</b></button>
                        <button><i>I</i></button>
                        <button><u>U</u></button>
                        </div>
                    </label>

                    <label>
                        Job Deadline
                        <input type="date" />
                    </label>

                    <label>
                        <div className="locationInput">
                            Enter Job Location
                            <input type="text" placeholder="Address" name="address"/>
                            <div className="locationRow">
                                <input type="text" placeholder="Barangay" name="barangay"/>
                                <input type="text" placeholder="City" name="city"/>
                                <input type="text" placeholder="Province" name="province"/>
                            </div>
                            <input type="text" placeholder="Gmaps Coordinates" name="maps"/>
                        </div>
                    </label>
                    </div>
            </div>
        </div>
    )
}