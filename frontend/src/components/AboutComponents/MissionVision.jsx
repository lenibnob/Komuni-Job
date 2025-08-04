export default function MissionVision() {
    function Card({ text }) {
        return (
            <div className="missionVisionCard">
                <h2>{text.header}</h2>
                <h2>{text.content}</h2>
            </div>
        );
    }

    return (
        <div className="missionVisionBackground">
            <div className="missionVisionContainer">
                <div className="missionVisionHeader">
                    <h2>{`Many freelancers, first-time job seekers, and skilled individuals
                    struggle to find job opportunities not because they lack ability,
                    but because they lack visibility, connections,
                    or a trusted place to get started.`}</h2>
                </div>
                <div className="missionVisionCardContainer">
                    <Card text={{header: "MISSION", content: "A Philippines where every community member can safely, affordably, and with dignity find or offer help nearby."}}/>
                    <Card text={{header: "VISION", content: "A connected community where skills meet needs, and people grow together professionally, personally, and as a community."}}/>    
                </div>
            </div>
        </div>
    );
}