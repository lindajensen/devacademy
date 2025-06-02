import Hero from "../components/Hero";
import PopularCourses from "../components/PopularCourses";
import HowItWorks from "../components/HowItWorks";
import InstructorSpotlight from "../components/InstructorSpotlight";
import Testimonials from "../components/Testimonials";
import Banner from "../components/Banner";

function HomePage() {
	return (
		<>
			<Hero />
			<PopularCourses />
			<HowItWorks />
			<InstructorSpotlight />
			<Banner />
			<Testimonials />
		</>
	);
}

export default HomePage;
