import { useState } from "react";
import "@/css/DashboardCSS/PendingApplicants.css"
import { MdMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";
import { MdThumbUpOffAlt, MdThumbUpAlt, MdThumbDownOffAlt, MdThumbDownAlt } from "react-icons/md";

export default function JobApplicants() {
    const [isLikeClicked, setIsLikeClicked] = useState(false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(false);

    const handleLikeClick = () => {
        setIsLikeClicked(!isLikeClicked);
        if (!isLikeClicked) setIsDislikeClicked(false);
    };

    const handleDislikeClick = () => {
        setIsDislikeClicked(!isDislikeClicked);
        if (!isDislikeClicked) setIsLikeClicked(false);
    };

    return (
        <div className="jobApplicantsContainer">
            <div className="applicantsHeader">
                <h2>Job Applicants</h2>
                <div className="applicantViews">
                    <h3>Views: 6</h3>
                    <h3>Applicants: 3</h3>
                </div>
                <hr />
            </div>

            <div className="applicantsList">
                <div className="applicantFile">
                    <div className="applicantUser">
                        <div className="applicantProfile"></div>

                        <div className="applicantName">
                            <h2>User</h2>
                            <h3>Tier</h3>
                        </div>
                    </div>
                    <div className="applicantContacts">
                        <HiOutlinePhone className="applicantNumber"/>      
                        <MdMailOutline className="applicantEmail"/>
                        <button className="applicantContactsButton">View Profile</button>

                        {/* Like Button */}
                        <button 
                            className="applicantContactsAccept" 
                            onClick={handleLikeClick}
                        >
                            {isLikeClicked 
                                ? <MdThumbUpAlt className="applicantContactsAccept"/> 
                                : <MdThumbUpOffAlt className="applicantContactsAccept"/>
                            }
                        </button>

                        {/* Dislike Button */}
                        <button 
                            className="applicantContactsAccept" 
                            onClick={handleDislikeClick}
                        >
                            {isDislikeClicked 
                                ? <MdThumbDownAlt className="applicantContactsAccept"/> 
                                : <MdThumbDownOffAlt className="applicantContactsAccept"/>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
