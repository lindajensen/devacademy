import { useState, useEffect } from "react";

import { Instructor } from "../App";

import {
	StyledInstructorSpotlightSection,
	StyledScrollableRow,
	StyledInstructorCard,
	StyledImage,
	StyledInstructorQuote
} from "./styles/InstructorSpotlight.styled";

function InstructorSpotlight() {
	const [instructors, setInstructors] = useState<Instructor[]>([]);
	const [selectedInstructor, setSelectedInstructor] =
		useState<Instructor | null>(null);

	useEffect(() => {
		fetch("/api/instructors")
			.then((response) => response.json())
			.then((data: Instructor[]) => setInstructors(data));
	}, []);

	function handleSelectInstructor(id: number) {
		const foundInstructor = instructors.find(
			(instructor) => instructor.instructor_id === id
		);

		if (!foundInstructor) {
			return;
		} else {
			setSelectedInstructor(foundInstructor);
		}
	}

	return (
		<StyledInstructorSpotlightSection>
			<h2>Meet the Instructors</h2>
			<StyledScrollableRow>
				{instructors.map((instructor) => (
					<StyledInstructorCard key={instructor.instructor_id}>
						<button
							onClick={() => handleSelectInstructor(instructor.instructor_id)}
							aria-label={`Select instructor ${instructor.name}`}>
							<StyledImage
								$isActive={
									selectedInstructor?.instructor_id === instructor.instructor_id
								}
								src={`/${instructor.profile_picture}`}
								alt={`Profile picture for instructor ${instructor.name}`}
							/>
						</button>
					</StyledInstructorCard>
				))}
			</StyledScrollableRow>

			<StyledInstructorQuote>
				{selectedInstructor ? (
					<blockquote>
						<p>{selectedInstructor.quote}</p>
						<footer>- {selectedInstructor.name}</footer>
					</blockquote>
				) : (
					<p>
						Curious about who's behind the courses? Click on a profile to
						discover each instructor's passion for teaching.
					</p>
				)}
			</StyledInstructorQuote>
		</StyledInstructorSpotlightSection>
	);
}

export default InstructorSpotlight;
