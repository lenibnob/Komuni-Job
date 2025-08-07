import "@/css/DashboardCSS/Dashboard.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import JobList from "@/components/DashboardComponents/Dashboard/JobList";

export default function DashboardPage() {
    return (
        <>
            <div className="dashboard">
                <DashboardNav /> 
                <JobList />
            </div>
        </>
    );
}