import "@/css/About.css";
import NavBar from "@/components/NavBar";
import AboutIntro from "@/components/AboutComponents/AboutIntro";
import MissionVision from "@/components/AboutComponents/MissionVision";
import TeamSection from "@/components/AboutComponents/TeamSection";
import UNGoals from "@/components/AboutComponents/UNGoals";
import YouthParticipation from "@/components/AboutComponents/YouthParticipation";
import AboutFooter from "@/components/AboutComponents/AboutFooter";


export default function AboutPage() {
    return (
        <>
            <NavBar authenticatePage={{ address: "/register", option: "Sign up" }} />
            <AboutIntro />
            <MissionVision />
            <TeamSection />
            <UNGoals />
            <YouthParticipation />
            <AboutFooter />
        </>
    );
}


