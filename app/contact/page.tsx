import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import GetInTouch from "./GetInTouch";
import Hero from '../../components/Hero'
import Map from "./Map";


export default function page() {
  return (
    <div className="w-full min-h-screen relative">
        <Hero title="Contact Us" />
        <GetInTouch />
        <ContactForm />
        <ContactCards />
        <Map />
    </div>
  )
}
