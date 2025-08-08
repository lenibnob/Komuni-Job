export default function YouthParticipation() {

    function YouthCard({ text, youthClass }) {
        return (
            <div className="youthCard">
                <div className={`youthCardIcon ${youthClass}`}></div>
                <div className="youthCardTexts">
                    <h3>{text.header}</h3>
                    <h3>{text.content}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="youthParticipation">
            <div className="youthParticipationContainer">
                <h2>10 Centers for Youth Participation</h2>
                <div className="youthCardsContainer">
                    <YouthCard youthClass="economicEmpowerment" text={{header: <div style={{ fontWeight: "bold" }}>ECONOMIC EMPOWERMENT</div>, content:<div style={{ fontWeight: "normal" }}>Uplifts youth by giving them access to small job opportunities, enabling them to earn while they learn.</div>}}/>
                    <YouthCard youthClass="governance" text={{header: <div style={{ fontWeight: "bold" }}>GOVERNANCE</div>, content: <div style={{ fontWeight: "normal" }}>KomuniJob gives youth a say in how work, trust, and visibility operate in their local communities.</div>}}/>
                    <YouthCard youthClass="activeCitizenship" text={{header: <div style={{ fontWeight: "bold" }}>ACTIVE CITIZENSHIP</div>, content: <div style={{ fontWeight: "normal" }}>Help youth build a track record of their contributions, no matter how small, and foster a culture of digital trust and community accountability.</div>}}/>
                    <YouthCard youthClass="socialInclusion" text={{header: <div style={{ fontWeight: "bold" }}>SOCIAL INCLUSION AND EQUITY</div>, content: <div style={{ fontWeight: "normal" }}>KomuniJOB open doors for those who are often left out: out-of-school youth, NEETs, freelancers, informal workers, or even student side-hustlers.</div>}}/>
                </div>
            </div>
        </div>
    );
}