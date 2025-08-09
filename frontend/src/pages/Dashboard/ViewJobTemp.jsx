import "@/css/DashboardCSS/ViewJob.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ViewJobPageTemp from "@/components/DashboardComponents/ViewJob/ViewJobPageTemp";

export default function JobPage() {
    return (
        <div className="viewJob">
            <DashboardNav />
            <ViewJobPageTemp />
        </div>
    );
}