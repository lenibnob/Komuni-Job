export default function TeamSection() {
    function TeamCard({ memberClass }) {
        return (
            <div className="teamCard">
                <div className={`teamImage ${memberClass}`}></div>
            </div>
        );
    }

    return (
        <div className="teamSection">
            <div className="teamSectionContainer">
                <h1>Meet Our Team</h1>
                <div className="teamCardsContainer">
                    <TeamCard memberClass="lance" />
                    <TeamCard memberClass="josh" />
                    <TeamCard memberClass="rein" />
                </div>
                <div className="teamCardsContainer">
                    <TeamCard memberClass="mark" />
                    <TeamCard memberClass="naomi" />
                    <TeamCard memberClass="shawnlee" />
                    <TeamCard memberClass="gelo" />
                </div>
            </div>
        </div>
    );
}
