import {
	StyledHowItWorksSection,
	StyledHowItWorksWrapper
} from "./styles/HowItWorks.styled";

import { FaUserPlus, FaBookOpen, FaGraduationCap } from "react-icons/fa6";

function HowItWorks() {
	return (
		<StyledHowItWorksSection>
			<h2>How it Works</h2>
			<StyledHowItWorksWrapper>
				<div>
					<FaUserPlus size={30} />
					<h3>Sign Up</h3>
					<p>Create your free account and start exploring top-rated courses.</p>
				</div>

				<div>
					<FaBookOpen size={30} />
					<h3>Choose a Course</h3>
					<p>
						Browse our catalog and pick a course that fits your goals and
						interests
					</p>
				</div>

				<div>
					<FaGraduationCap size={30} />
					<h3>Start Learning</h3>
					<p>Complete the course and earn your certificate of completion.</p>
				</div>
			</StyledHowItWorksWrapper>
		</StyledHowItWorksSection>
	);
}

export default HowItWorks;
