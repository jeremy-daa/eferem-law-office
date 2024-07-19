import Hero from "./Hero";
import Hero2 from "./Hero2";
import AboutUs from "./AboutUs";
import PracticeAreas from "./PracticeAreas";
import Retention from "./Retention";
import Staff from "./Staff";
import WeHelp from "./WeHelp";
import Experience from "./Experience";
import Blog from "./Blog";
import LetsWork from "./LetsWork";

export default function Home() {
  return (
    <div className="w-full min-h-screen relative">
        {/* <Hero /> */}
        <Hero2 />
        <AboutUs />
        <PracticeAreas />
        <Retention />
        <Staff />
        <WeHelp />
        <Experience />
        <Blog />
        <LetsWork />
    </div>
)}
