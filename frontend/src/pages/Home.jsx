import "../css/Home.css";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Card from "../homecomponent/Card";

export default function Home() {

    return (
        <>
            <NavBar />

            <div className="home">
                <div className="boxContainer">
                    <div className="box">
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

                <div className="cardContainer">

                    <div className="headRow">
                        <h1>KomuniJob</h1>
                        <h1>Post jobs. Find jobs. Hire locally.</h1>
                        <hr />

                        <div className="cardRow">
                            <Card className="card"
                                heading1="Start your journey. Join your neighborhood."
                                heading2="Create an account to join the local community network."
                            />
                            <Card className="card"
                                heading1="Look for jobs or offer jobs"
                                heading2="Apply for available jobs near you, or post a job you need done."
                            />
                            <Card className="card"
                                heading1="Build trust. Earn experience. Get paid."
                                heading2="After each job, both parties rate and pay each other accordingly."
                            />
                        </div>

                    </div>

                </div>


            </div>

            
        </>
    )

}