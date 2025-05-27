import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiArrowRight } from "react-icons/fi";

import {
	StyledInstructorSection,
	StyledInstructorCard
} from "../components/styles/InstructorsPage.styled";

interface Instructor {
	instructor_id: number;
	name: string;
	bio: string;
	profile_picture: string;
	rating: number;
	linkedin: string;
	focus_area: string;
	tags: string;
}

function InstructorsPage() {
	const [instructors, SetInstructors] = useState<Instructor[]>([]);

	const backendBaseUrl = import.meta.env.DEV ? "http://localhost:3000" : "";

	useEffect(() => {
		fetch("/api/instructors")
			.then((response) => response.json())
			.then((data: Instructor[]) => SetInstructors(data));
	}, []);

	return (
		<StyledInstructorSection>
			<h1>Meet Your Next Instructor</h1>
			<p>
				Get to know the talented instructors behind our courses. Professionals
				with real-world experience, here to support your learning journey.
				Whether you're diving into development, data, AI or cybersecurity,
				you're in good hands.
			</p>
			<div>
				{instructors.map((instructor) => (
					<StyledInstructorCard key={instructor.instructor_id}>
						<img
							src={`${backendBaseUrl}/${instructor.profile_picture}`}
							alt={instructor.name}
						/>
						<h2>{instructor.name}</h2>
						<p>{instructor.focus_area}</p>
						<p>
							{instructor.tags.split(" ").map((tag: string, index: number) => (
								<span key={index}>{tag}</span>
							))}
						</p>

						<Link
							aria-label={`Read more about instructor ${instructor.name}`}
							to={`/instructors/${instructor.instructor_id}`}>
							Read More
							<FiArrowRight />
						</Link>
					</StyledInstructorCard>
				))}
			</div>
		</StyledInstructorSection>
	);
}

export default InstructorsPage;
