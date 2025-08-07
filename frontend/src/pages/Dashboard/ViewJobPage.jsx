import "@/css/DashboardCSS/ViewJob.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import JobPage from "../../components/DashboardComponents/ViewJob/JobPage";

export default function ViewJob() {
    return (
        <div className="viewJob">
            <DashboardNav />
            <JobPage />
        </div>
    );
}