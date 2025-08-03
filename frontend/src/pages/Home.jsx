import "../css/Home.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Home() {

    function IntroductionCard({card}) {
        return (
            <div className="introductionCard">
                <div className="cardIcon">{card.icon}</div>
                <div className="cardText">
                    <h1>{card.text}</h1>
                </div>
                <hr />
                <div className="cardFooter">
                    <h1>{card.footer}</h1>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <NavBar authenticatePage={{address : "/register", option : "Sign up"}} />
            <div className="home">
                <div className="mottoContainer">
                    <div className="motto">
                        <div>
                            <h1>Jobs that build trust.</h1>
                            <h1>Powered by your community</h1>
                            <hr />
                        </div>
                        <Link className="startLink" to="/register">
                            <button className="startButton">Get Started</button>
                        </Link>
                    </div>
                </div>
                <div className="introduction">
                    <div className="introductionContainer">
                        <div className="introductionHeaderContainer">
                            <h1>KomuniJob</h1>
                            <h2>Post jobs. Find jobs. Hire locally.</h2>
                        </div>
                        <hr />
                        <div className="introductionCardsContainer">
                            <IntroductionCard card={{icon: "🏠", text: "Start your journey. Join your neighborhood.", footer: "Create an account to join the local community network."}} />
                            <IntroductionCard card={{icon: "🔍", text: "Look for jobs or offer jobs.", footer: "Apply for available jobs near you or post a job you need done."}} />
                            <IntroductionCard card={{icon: "💲", text: "Build trust. Earn experience. Get paid.", footer: "After completing tasks, both parties rate each other and handle payment."}} />
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}