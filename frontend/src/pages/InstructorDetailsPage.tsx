import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import StarDisplay from "../components/StarDisplay";

import { Instructor } from "../App";

import { FaLinkedin } from "react-icons/fa";

import { StyledContentFallback } from "../components/styles/Global";
import {
	StyledInstructorCard,
	StyledInstructorContent,
	StyledInstructorTags
} from "../components/styles/InstructorDetailsPage.styled";

function InstructorDetailsPage() {
	const { id } = useParams();

	const [instructor, setInstructor] = useState<Instructor | null>(null);

	useEffect(() => {
		fetch(`/api/instructors/${id}`)
			.then((response) => response.json())
			.then((data: Instructor) => setInstructor(data))
			.catch((error: unknown) =>
				console.log("Error loading instructor", error)
			);
	}, [id]);

	// SCROLL WHEN LOADING COMPONENT
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [instructor]);

	if (!instructor) {
		return (
			<StyledContentFallback>
				<h2>Instructor not found</h2>
				<p>
					We couldn't load the instructor details. Try again later or go back to
					explore more courses.
				</p>
			</StyledContentFallback>
		);
	}

	return (
		<section>
			<StyledInstructorCard>
				<img
					src={`/${instructor.profile_picture}`}
					alt={`Profile picture of instructor ${instructor.name}`}
				/>

				<StyledInstructorContent>
					<h1>{instructor.name}</h1>
					<p>{instructor.focus_area}</p>

					<StarDisplay rating={instructor.rating} />

					{instructor.bio.split("\n\n").map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}

					<StyledInstructorTags>
						{instructor.tags.split(" ").map((tag: string, index: number) => (
							<span key={index}>{tag}</span>
						))}
					</StyledInstructorTags>
					<a
						aria-label={`Connect with instructor ${instructor.name} on Linkedin`}
						href={instructor.linkedin}
						target="_blank"
						rel="noopener noreferrer">
						<FaLinkedin className="linkedin-icon" />
						Connect on LinkedIn
					</a>
				</StyledInstructorContent>
			</StyledInstructorCard>
		</section>
	);
}

export default InstructorDetailsPage;
