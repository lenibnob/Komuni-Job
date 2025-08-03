import "@/css/About.css";
import NavBar from "@/components/NavBar";

export default function AboutPage() {
    return (
        <>
            <NavBar authenticatePage={{address: "/register", option: "Sign up"}} />
            <div className="aboutPage">
                <div className="aboutBackground">
                    <div className="about">
                        <div className="imageLogo"></div>
                        <div className="aboutText">
                            <h1>ABOUT | KomuniJOB</h1>
                            <h2>{`A community-powered platform built to bridge the gap
                            between skilled individuals and those who need them
                            right in their local neighborhood.`}</h2>
                            <h3>{`Made for first-time job seekers, freelancers, and anyone
                            looking for gigs.`}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}