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
                    <div className="userProfileResume">

                    </div>
                </div>
            </div>
        </div>
    )
}