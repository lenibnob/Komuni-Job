import "@/css/Dashboard.css";
import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import JobList from "@/components/DashboardComponents/JobList";

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