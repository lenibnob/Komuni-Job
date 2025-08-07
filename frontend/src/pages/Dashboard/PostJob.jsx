import "@/css/DashboardCSS/PostJob.css"
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import PostJobPage from "@/components/DashboardComponents/PostJob/PostJobPage";

export default function PostJob() {
    return (
        <div className="postJob">
            <DashboardNav />
            <PostJobPage />
        </div>
    );
}