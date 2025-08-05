import SearchBar from "@/components/DashboardComponents/SearchBar";

export default function JobList () {
    return (
        <>
        <div className="jobList">
            <SearchBar />
            <div className="jobContainer">
                <div className="jobHeader">
                    <h1>Job Listing</h1>
                    <hr />
                </div>
            </div>
        </div>
        </>
    );
}