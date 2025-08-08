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
                    <TeamCard memberClass="lance" name={"Lance\nFrontEnd"} /> 
                    <TeamCard memberClass="josh" name={"Joshua\nBackEnd"} />
                    <TeamCard memberClass="rein" name={"Rein\nBackEnd"} />
                </div>
                <div className="teamCardsContainer">
                    <TeamCard memberClass="mark" name={"Mark\nFrontEnd"} />
                    <TeamCard memberClass="naomi" name={"Naomi\nFrontEnd"} />
                    <TeamCard memberClass="shawnlee" name={"Shawnlee\nBackEnd"} />
                    <TeamCard memberClass="gelo" name={"Angelo\nDocumentation"} />
                </div>
            </div>
        </div>
    );
}

