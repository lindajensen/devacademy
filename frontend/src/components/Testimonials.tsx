import { Link } from "react-router-dom";

import {
	StyledTestimonialsSection,
	StyledTestimonialIntro,
	StyledTestimonialsWrapper
} from "../components/styles/Testimonials.styled";

function Testimonials() {
	return (
		<StyledTestimonialsSection>
			<StyledTestimonialIntro>
				<p>Real stories from real learners</p>
				<h2>Student Success Stories</h2>
				<Link to="#">Read More Stories</Link>
			</StyledTestimonialIntro>

			<StyledTestimonialsWrapper>
				<blockquote>
					<h3>Landed my first developer job thanks to DevAcademy</h3>
					<p>
						I had been trying to learn web development on my own but always felt
						overwhelmed. Joining DevAcademy changed everything. The instructors
						made complex topics click. I built real projects, got feedback, and
						gained confidence. Just three weeks after finishing the course, I
						landed a job as a junior developer.
					</p>
					<footer>- Emma S., Junior Frontend Developer</footer>
				</blockquote>

				<blockquote>
					<h3>
						This plattform helped me learn more in 3 months than I did in a full
						year of university
					</h3>
					<p>
						As a computer science student, I often felt my classes lacked
						practical relevance. DevAcademy filled those gaps. The backend
						courses gave me hands-on experience with real tools like Node.js and
						SQL, and the focus on complete, working apps made a huge difference.
						I now feel ready to apply for internships and freelance work.
					</p>
					<footer>- Alex R., CS Student and Aspiring Backend Developer</footer>
				</blockquote>
			</StyledTestimonialsWrapper>
		</StyledTestimonialsSection>
	);
}

export default Testimonials;
