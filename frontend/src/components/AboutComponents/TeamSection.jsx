export default function TeamSection() {
    function TeamCard({ memberClass, name }) {
        return (
            <div className="teamCard">
                <div
                    className={`teamImage ${memberClass}`}
                    data-name={name}
                ></div>
            </div>
        );
    }

    return (
        <div className="teamSection">
            <div className="teamSectionContainer">
                <h1>Meet Our Team</h1>
                <div className="teamCardsContainer">
                    <TeamCard memberClass="lance" name={"Lance\nFrontend Dev"} /> 
                    <TeamCard memberClass="josh" name={"Joshua\nFull Stack Dev"} />
                    <TeamCard memberClass="rein" name={"Rein\nBackend Dev"} />
                </div>
                <div className="teamCardsContainer">
                    <TeamCard memberClass="mark" name={"Mark\nUI/UX Designer"} />
                    <TeamCard memberClass="naomi" name={"Naomi\nFrontend Dev"} />
                    <TeamCard memberClass="shawnlee" name={"Shawnlee\nBackend Dev"} />
                    <TeamCard memberClass="gelo" name={"Angelo\nTeam Leader"} />
                </div>
            </div>
        </div>
    );
}

