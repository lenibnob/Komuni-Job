import "@/css/DashboardCSS/PostJob.css";
import PostHeader from "@/components/DashboardComponents/PostJob/PostHeader";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import {postJob} from '@/endpoints/api'

export default function PostJobPage() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [jobCategory, setJobCategory] = useState([]);
    const [jobSkills, setJobSkills] = useState([]);
    const [jobTags, setJobTags] = useState([]);
    const [jobDetail, setJobDetail] = useState([{
        job_title: "",
        payment_option_id: "",
        job_category_id: "",
        job_skills: "",
        payment_amount: "",
        job_descritpion: "",
        job_expire_date: "",
        job_posted: "",
        address: "",
        barangay: "",
        city: "",
        province: "",
        vacancy: "",
        maps: ""
    }]);

    const handleChange = (e) => {
        setJobDetail({...jobDetail, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        const token = localStorage.getItem("access_key");

        fetch("http://127.0.0.1:8000/api/job-categories/", {
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
            credentials: 'include',
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

    const handlePost = async () => {
        try{
            if(await postJob(jobDetail)) {
                alert("Job posted");
                navigate("/dashboard");
            } else {
                alert("There is an error on posting job");
            }
        }
        catch(error){
            console.error(`${error}`);
        }
    }

    return (
        <div className="postJobContainer">
            <PostHeader />

            <div className="postJobForm">
                
                <div className="jobPost-formLeft">
                    <label>
                        Job post title
                        <input type="text" placeholder="Enter job title" name="job_title" onChange={handleChange}/>
                    </label>

                    <label>
                        Job category
                        <select name="job_category_id" value={jobDetail.job_category} onChange={handleChange}>
                            <option value="">Select a job category</option>
                            {jobCategory.map(category => (
                                <option key={category.job_cat_id} value={category.job_category_id}>
                                    {category.job_cat_name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Payment option
                        <select name="payment_option" onChange={(e) => {
                            handleChange(e);
                            setPaymentMethod(e.target.value);
                            setJobDetail(prev => ({
                                ...prev,
                                payment_option_id: e.target.value === "Hourly" ? 1 : 2
                            }));
                        }}>
                        <option value="">Select option</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Fixed">Fixed</option>
                        </select>
                    </label>

                    <label>
                        Required skill
                        <select value={jobDetail.job_skills} name="job_skills" onChange={handleChange}>
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
                        <input type="number" name="vacancy" onChange={handleChange} placeholder="Hiring amount/vacancy"/>
                    </label>

                    <label>
                        Payment Amount
                        <div className="jobPost-costInput">
                        <span>₱</span>
                        <input type="number" name="payment_amount" onChange={handleChange} placeholder={paymentMethod}/>
                        </div>
                    </label>
                    </div>

                    <div className="jobPost-formRight">
                    <label>
                        Description
                        <p>Provide a brief and concise job description</p>
                        <textarea placeholder="Short description for the job" name="job_descritpion" onChange={handleChange}/>
                        <div className="jobPost-formattingBar">
                        </div>
                    </label>

                    <label>
                        Job Deadline
                        <input type="date" name="job_expire_date" onChange={handleChange} />
                    </label>

                    <label>
                        <div className="locationInput">
                            Enter Job Location
                            <input type="text" placeholder="Address" name="address" onChange={handleChange}/>
                            <div className="locationRow">
                                <input type="text" placeholder="Barangay" name="barangay" onChange={handleChange}/>
                                <input type="text" placeholder="City" name="city" onChange={handleChange}/>
                                <input type="text" placeholder="Province" name="province" onChange={handleChange}/>
                            </div>
                            <input type="text" placeholder="Gmaps Coordinates" name="maps" onChange={handleChange}/>
                        </div>
                    </label>
                    </div>
            </div>
        </div>
    )
}