import "@/css/DashboardCSS/PostJob.css";
import PostHeader from "@/components/DashboardComponents/PostJob/PostHeader";
import {useState} from 'react';

export default function PostJobPage() {
    const [jobDetail, setJobDetail] = useState([{
        job_title: "",
        job_category: "",
        payment_option: "",
        job_category: [""],
        job_hiring_amount: "",
        job_cost_per_hour: "",
        payment_amount: "",
        job_descritpion: "",
        job_expire_date: "",
        address: "",
        barangay: "",
        city: "",
        province: ""

    }]);

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
                        <input type="text" />
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
                        Location
                        <p>Where is your job site located</p>
                        <div className="jobPost-mapContainer">
                        <img src="https://maps.googleapis.com/maps/api/staticmap?center=Santa+Rosa&zoom=15&size=600x300" alt="Map" />
                        </div>
                    </label>
                    </div>
            </div>
        </div>
    )
}