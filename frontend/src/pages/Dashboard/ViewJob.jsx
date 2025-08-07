import "@/css/DashboardCSS/ViewJob.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ViewJobPage from "@/components/DashboardComponents/ViewJob/ViewJobPage";

export default function JobPage() {
    return (
        <div className="viewJob">
            <DashboardNav />
            <ViewJobPage />
        </div>
    );
}