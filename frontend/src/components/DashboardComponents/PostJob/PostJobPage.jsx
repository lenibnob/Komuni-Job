import "@/css/DashboardCSS/PostJob.css";
import PostHeader from "@/components/DashboardComponents/PostJob/PostHeader";
import {useState, useEffect} from 'react';

export default function PostJobPage() {
    const [jobCategory, setJobCategory] = useState([]);
    const [selected, setSelected] = useState("");
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
        fetch("http://127.0.0.1:8000/api/job-categories/", {
            method: 'GET',
            credentials: 'include'
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
                        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                            <option value="">Select a job category</option>
                            {jobCategory.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
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
                        Tags
                        <input type="text" />
                        <div className="jobPost-tagPreview">
                        <p>Preview</p>
                        <div className="jobPost-tags">
                            <div className="jobPost-tag">Example</div>
                            <div className="jobPost-tag">Sample</div>
                            <div className="jobPost-tag jobPost-tagAdd">+</div>
                        </div>
                        </div>
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