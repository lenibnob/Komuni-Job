export default function TeamSection() {
    function TeamCard({member}) {
        return (
            <div className="teamCard">
                <img src="@frontend\recources\SVG files\profiles\Lance.svg"/>
            </div>
        );
    }

    return (
        <div className="teamSection">
            <div className="teamSectionContainer">
                <h1>Meet Our Team</h1>
                <div className="teamCardsContainer">
                    <TeamCard />
                    <TeamCard />
                    <TeamCard />
                </div>
                <div className="teamCardsContainer">
                    <TeamCard />
                    <TeamCard />
                    <TeamCard />
                    <TeamCard />
                </div>
            </div>
        </div>
    );
}