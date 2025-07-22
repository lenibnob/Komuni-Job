import "../css/Home.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
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

                <div className="featuredJobs">
                    <div className="headRow">
                        <h1>KomuniJob's</h1>
                        <h1>featured jobs</h1>
                    </div>
                    <div className="cardGallery">
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                    </div>
                    <div className="cardGallery">
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                        <Card className="card"/>
                    </div>
                </div>

                <div className="learnMore">
                    <div className="headCol">
                        <h1>
                            Empowering local communities through trusted micro-jobs and freelancing.
                        </h1> <h1>
                            KomuniJOB connects skilled individuals and job posters within their barangay to build trust, promote fairness and grow local economies.
                        </h1>
                    </div>
                    <Link>
                        <button className="learnButton">
                            Learn more
                        </button>
                    </Link>
                </div>


                <div className="journeyPath">
                    <div className="headCol">
                        <h1>Your Journey Path</h1>
                        <h1>Start with nothing. Build your Future</h1>
                    </div>
                    <div className="journeyCardRow">
                        <Card className="journeyCard"
                        heading1="Sign Up"
                        />
                        <Card className="journeyCard"
                        heading1="Post or Browse Jobs"
                        />
                        <Card className="journeyCard"
                        heading1="Get Hired"
                        />
                        <Card className="journeyCard"
                        heading1="Do the Work"
                        />
                        <Card className="journeyCard"
                        heading1="Get Paid"
                        />
                    </div>
                    <div className="signCol">
                        <h1>Jobs that build trust.</h1>
                        <h1>Powered by your community.</h1>
                        <Link>
                            <button className="signButton">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
                
                <div className="contacts">
                    <div className="head">
                        <h1>KomuniJOB</h1>
                    </div>
                    <div className="contactRow">
                        <div className="contactLinks">
                            <h1>Company</h1>
                            <h1>About</h1>
                            <h1>Placeholder</h1>
                            <h1>Placeholder</h1>
                        </div>
                        <div className="contactLinks">
                            <h1>Contact</h1>
                            <h1>Help/FAQ</h1>
                            <h1>Press</h1>
                            <h1>Affiliates</h1>
                        </div>
                        <div className="contactLinks">
                            <h1>More</h1>
                            <h1>Placeholder</h1>
                            <h1>Placeholder</h1>
                            <h1>Placeholder</h1>
                        </div>
                    </div>

                    <div className="email">
                        <h1>All rights reserved@komunijob</h1>
                    </div>
                </div>

            </div>
        </>
    )

}