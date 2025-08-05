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
                    <h2>{(`Many freelancers, first-time job seekers, and skilled 
                        locals are struggling to find jobs not because they
                        lack ability, but because they lack visibility,
                        connections, or a trusted place to get started.`)}</h2>
                </div>
                <div className="missionVisionCardContainer">
                    <Card text={{header: "MISSION", content: (<><div style={{ fontWeight: "normal"}}>A Philippines where<br/> every community<br/> member can safely,<br/> affordably, and with<br/> dignity find or offer<br/> help nearby.</div></>)}}/>
                    <Card text={{header: (<><div style={{ fontWeight: "bold"}}/>VISION</>), content: (<><div style={{ fontWeight: "normal"}}> A connected <br/>community where <br/>skills meet needs,<br/> and people grow together<br/> professionally,<br/> personally, and as a<br/> community.</div></>)}}/>    
                </div>
            </div>
        </div>
    );
}