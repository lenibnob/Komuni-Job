import "@/css/DashboardCSS/PostJob.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { getCookie } from "@/endpoints/api";
import axios from 'axios';

export default function PostJobPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobCategory, setJobCategory] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [jobDetail, setJobDetail] = useState({
    job_title: "",
    payment_option: "",
    job_category: "",
    required_skills: [],
    payment_amount: "",
    job_description: "",
    application_deadline: "",
    job_expire_date: "",
    vacancies: 1,
    address: "",
    barangay: "",
    city: "",
    province: "",
    google_maps_url: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetail({ ...jobDetail, [name]: value });
  };

  // Handle skill selection
  const handleSkillChange = (e) => {
    const skillId = parseInt(e.target.value);
    if (skillId) {
      if (!selectedSkills.includes(skillId)) {
        setSelectedSkills([...selectedSkills, skillId]);
        setJobDetail({
          ...jobDetail,
          required_skills: [...jobDetail.required_skills, skillId]
        });
      }
    }
  };

  // Remove a selected skill
  const removeSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    setJobDetail({
      ...jobDetail,
      required_skills: jobDetail.required_skills.filter(id => id !== skillId)
    });
  };

  // Handle cover photo selection
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhoto(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch job categories
  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/job-categories/", {
          withCredentials: true
        });
        setJobCategory(response.data);
      } catch (err) {
        console.error("Error fetching job categories:", err);
        setError("Failed to load job categories");
      }
    };
    
    fetchJobCategories();
  }, []);

  // Fetch job skills
  useEffect(() => {
    const fetchJobSkills = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/job-skills/", {
          withCredentials: true
        });
        setJobSkills(response.data);
      } catch (err) {
        console.error("Error fetching job skills:", err);
        setError("Failed to load job skills");
      }
    };
    
    fetchJobSkills();
  }, []);

  // Filtered skills based on selected category
  const filteredSkills = jobSkills.filter(
    skill => !jobDetail.job_category || skill.job_category == jobDetail.job_category
  );

  // Validate form data
  const validateForm = () => {
    const requiredFields = [
      'job_title', 
      'job_description', 
      'job_category', 
      'payment_option', 
      'payment_amount',
      'vacancies',
      'application_deadline',
      'job_expire_date',
      'address',
      'barangay',
      'city',
      'province'
    ];
    
    for (const field of requiredFields) {
      if (!jobDetail[field]) {
        setError(`${field.replace('_', ' ')} is required`);
        return false;
      }
    }
    
    if (jobDetail.required_skills.length === 0) {
      setError('At least one skill is required');
      return false;
    }
    
    return true;
  };

  // Post the job
  const handlePost = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const csrftoken = getCookie('csrftoken');

    try {
      // Prepare data - convert types appropriately
      const jobData = {
        ...jobDetail,
        payment_option: parseInt(jobDetail.payment_option),
        job_category: parseInt(jobDetail.job_category),
        payment_amount: parseFloat(jobDetail.payment_amount),
        vacancies: parseInt(jobDetail.vacancies) || 1
      };

      console.log("Sending job data:", jobData);

      // Step 1: Create the job
      const response = await axios.post(
        "http://localhost:8000/api/jobs/", 
        jobData,
        { 
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Job creation response:", response.data);
      
      const jobId = response.data.job_id;
      
      // Step 2: Upload cover photo if available
      if (coverPhoto && jobId) {
        const formData = new FormData();
        formData.append('image', coverPhoto);
        
        await axios.post(
          `http://localhost:8000/api/jobs/${jobId}/upload-cover-photo/`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': csrftoken
            }
          }
        );
      }
      
      alert("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error posting job:", err);
      if (err.response?.data) {
        console.log("Error details:", err.response.data);
        
        // Handle specific API errors
        if (typeof err.response.data === 'object') {
          const errorMessages = [];
          for (const field in err.response.data) {
            errorMessages.push(`${field}: ${err.response.data[field]}`);
          }
          setError(errorMessages.join('\n'));
        } else {
          setError(err.response.data);
        }
      } else {
        setError("Failed to post job. Please check all fields.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get skill name by ID
  const getSkillNameById = (id) => {
    const skill = jobSkills.find(skill => skill.job_skill_id === id);
    return skill ? skill.job_skill_name : 'Unknown Skill';
  };

  return (
    <div className="postJobContainer">
      {/* Component JSX remains unchanged */}
      <div className="postHeader">
        <div className="rowThis">
          <Link className="rowThis" to="/dashboard">
            <button className="returnButton">
              <IoArrowBackCircleOutline />
            </button>
          </Link>
          <p>Create Job Posting</p>
        </div>

        <div className="groupThis">
          <button className="deletePostButton"><FiTrash2 /></button>
          <button className="postHeaderButton" disabled={loading}>Preview</button>
          <button className="postHeaderButton" disabled={loading}>Save as Draft</button>
          <button 
            className="postHeaderButton" 
            onClick={handlePost} 
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="postJobForm">
        <div className="jobPost-formLeft">
          <div className="top_row">
            <label>
              Job post title *
              <input 
                type="text" 
                placeholder="Enter job title" 
                name="job_title" 
                value={jobDetail.job_title}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Vacancies *
              <input 
                type="number" 
                name="vacancies" 
                value={jobDetail.vacancies}
                onChange={handleChange} 
                placeholder="Number of positions available"
                min="1"
                required
              />
            </label>
          </div>

          <div className="description_field">
            <label>
              Description *
              <textarea 
                placeholder="Detailed description for the job" 
                name="job_description" 
                value={jobDetail.job_description}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="middle_row">
            <label>
              Job category *
              <select 
                name="job_category" 
                value={jobDetail.job_category} 
                onChange={handleChange}
                required
              >
                <option value="">Select a job category</option>
                {jobCategory.map(category => (
                  <option key={category.job_cat_id} value={category.job_cat_id}>
                    {category.job_cat_name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Required skills *
              <select 
                value="" 
                onChange={handleSkillChange}
                disabled={!jobDetail.job_category}
              >
                <option value="">Add required skills</option>
                {filteredSkills.map(skill => (
                  <option key={skill.job_skill_id} value={skill.job_skill_id}>
                    {skill.job_skill_name}
                  </option>
                ))}
              </select>
              <div className="selected-skills">
                {selectedSkills.map(skillId => (
                  <div key={skillId} className="skill-tag">
                    {getSkillNameById(skillId)}
                    <button type="button" onClick={() => removeSkill(skillId)}>×</button>
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="bottom_row">
            <label>
              Payment option *
              <select 
                name="payment_option" 
                value={jobDetail.payment_option}
                onChange={(e) => {
                  handleChange(e);
                  setPaymentMethod(e.target.value == 1 ? "Hourly" : "Fixed");
                }}
                required
              >
                <option value="">Select option</option>
                <option value={1}>Hourly</option>
                <option value={2}>Fixed</option>
              </select>
            </label>

            <label>
              Payment Amount *
              <div className="jobPost-costInput">
                <span>₱</span>
                <input 
                  type="number" 
                  name="payment_amount" 
                  value={jobDetail.payment_amount}
                  onChange={handleChange} 
                  placeholder={paymentMethod || "Amount"}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </label>
          </div>
        </div>

        <div className="jobPost-formRight">
          <div 
            className="job_image" 
            onClick={() => document.getElementById('cover_photo').click()}
            style={coverPhotoPreview ? {
              backgroundImage: `url(${coverPhotoPreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          >
            {!coverPhotoPreview && "Select Cover Photo"}
            <input 
              type="file" 
              id="cover_photo" 
              name="cover_photo" 
              accept="image/*" 
              style={{display: 'none'}} 
              onChange={handleCoverPhotoChange}
            />
            {coverPhotoPreview && <div className="image-overlay">Change Image</div>}
          </div>
        
          <label>
            Job expiry date *
            <input
              type="date"
              name="job_expire_date"
              value={jobDetail.job_expire_date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Application deadline *
            <input
              type="date"
              name="application_deadline"
              value={jobDetail.application_deadline}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <div className="locationInput">
              Enter Job Location *
              <input 
                type="text" 
                placeholder="Address" 
                name="address" 
                value={jobDetail.address}
                onChange={handleChange}
                required
              />
              <div className="locationRow">
                <input 
                  type="text" 
                  placeholder="Barangay" 
                  name="barangay" 
                  value={jobDetail.barangay}
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text" 
                  placeholder="City" 
                  name="city" 
                  value={jobDetail.city}
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Province" 
                  name="province" 
                  value={jobDetail.province}
                  onChange={handleChange}
                  required
                />
              </div>
              <input 
                type="text" 
                placeholder="Google Maps URL (optional)" 
                name="google_maps_url" 
                value={jobDetail.google_maps_url}
                onChange={handleChange}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}