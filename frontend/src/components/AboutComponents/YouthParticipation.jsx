export default function YouthParticipation() {

    function YouthCard({ text }) {
        return (
            <div className="youthCard">
                <div className="youthCardIcon"></div>
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
                    <YouthCard text={{header: "ECONOMIC EMPOWERMENT", content:"Uplifts youth by giving them access to small job opportunities, enabling them to earn while they learn."}} />
                    <YouthCard text={{header : "GOVERNANCE", content: "KomuniJob gives youth a say in how work, trust, and visibility operate in their local communities."}} />
                    <YouthCard text={{header: "ACTIVE CITIZENSHIP", content: "Help youth build a track record of their contributions, no matter how small, and foster a culture of digital trust and community accountability."}} />
                    <YouthCard text={{header: "SOCIAL INCLUSION AND EQUITY", content: "KomuniJOB open doors for those who are often left out: out-of-school youth, NEETs, freelancers, informal workers, or even student side-hustlers."}} />
                </div>
            </div>
        </div>
    );
}