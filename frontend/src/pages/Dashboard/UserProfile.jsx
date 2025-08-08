import "@/css/DashboardCSS/UserProfile.css"
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import UserProfileDetails from "@/components/DashboardComponents/UserProfile/UserProfileDetails";
import UserProfileDescription from "@/components/DashboardComponents/UserProfile/UserProfileDescription";

export default function UserProfile() {
    return (
        <div className="userProfilePage">
            <DashboardNav />
            <div className="userProfileContainer">
                <div className="userProfileBackground">
                    {/*INSERT IMAGE HERE BACKEND DEVS*/}
                </div>
                <div className="userProfile">
                    <UserProfileDetails />
                    <UserProfileDescription />

                    <div className="userProfileResumeContainer">
                        <div className="userProfileResume">
                            <h2>RESUMES</h2>
                            <div>
                                <h2>no idea what to put here</h2>
                            </div>
                        </div>
                        <div className="userProfileFinishedJobs">
                            <h2>FINISHED JOB</h2>
                            <div>
                                <h2>list here</h2>
                                <h2>list here</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}