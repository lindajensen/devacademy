import { Link } from "react-router-dom";

import { StyledHeroSection, StyledActionButtons } from "./styles/Hero.styled";

function Hero() {
	return (
		<StyledHeroSection>
			<img src="/hero-img.png" alt="" />

			<div>
				<h1>Learn to Code. Build Your Future.</h1>
				<p>Structured content that makes learning simple and fun.</p>

				<StyledActionButtons>
					<Link aria-label="Create a new account" to="/sign-up">
						Sign Up
					</Link>
					<Link aria-label="Explore all available courses" to="/all-courses">
						Browse Courses
					</Link>
				</StyledActionButtons>
			</div>
		</StyledHeroSection>
	);
}

export default Hero;
