import "@/css/DashboardCSS/ViewJob.css"
import ApplyHeader from "@/components/DashboardComponents/ViewJob/ApplyHeader";

export default function ViewJobPage() {

    return (
        <div className="viewJobPage">
            <ApplyHeader />
            <div className="jobFile">
                <div className="viewJobInfo">
                    <div className="jobUserInfo">
                        <div className="jobUserProfile">
                            <div className="jobUserProfileImage"></div>
                            <div className="jobUserName">
                                <h2>user</h2>
                                <h2 className="jobUserTier">Tier 1</h2>
                            </div>
                        </div>
                        <h3>( ✓ ) Approved Employer</h3>
                    </div>

                    <div className="viewJobDetails">
                        <h1>Accounting</h1>
                        <h3>Hiring 10 people</h3>
                        <h2>Job Category</h2>
                        <h3>public works</h3>
                        <h2>Location</h2>
                        <h3>Brgy santo. Sta Rosa</h3>

                        <h2>Job Tags</h2>
                        <div className="jobTags">
                            <h3>Entry-Level</h3>
                            <h3>Clerical Work</h3>
                        </div>

                        <h2>Hourly pay of $100</h2>
                        <h2>2 day job</h2>
                    </div>
                    <div className="jobTimePosted">
                        <h2>Posted 30 mins ago.</h2>
                        <h2>deadline by July 30, 2025</h2>
                    </div>
                </div>
                <div className="viewJobDescription">
                    <div className="jobFileImage"></div>
                    <h2>Job Description</h2>
                    <h2>Lorem ipsum I forgot the rest of the fake latin canva description blah blah heil hitler</h2>
                </div>
            </div>
        </div>
    );
}