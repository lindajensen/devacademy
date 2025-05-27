import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CourseIncludingInstructorAndRating } from "../App";

import {
	StyledAllCoursesSection,
	StyledCourses,
	StyledCourseCard
} from "../components/styles/AllCoursesPage.styled";

function AllCoursesPage() {
	const [courses, setCourses] = useState<CourseIncludingInstructorAndRating[]>(
		[]
	);

	// FETCH ALL COURSES
	useEffect(() => {
		fetch("/api/courses")
			.then((response) => response.json())
			.then((data: CourseIncludingInstructorAndRating[]) => setCourses(data))
			.catch((error: unknown) => console.log("Error fetching courses:", error));
	}, []);

	return (
		<StyledAllCoursesSection>
			<h1>Discover Your Next Skill</h1>
			<p>
				Explore a wide variety of courses designed to boost your skills and
				support your personal or professional growth. Whether you're interested
				in web- or mobile development, AI, cybersecurity or data science;
				there's something here for everyone.
			</p>

			<h2>Browse All Courses</h2>
			<StyledCourses>
				{courses.map((course) => (
					<StyledCourseCard key={course.course_id}>
						<Link
							aria-label={`View details for the course ${course.course_name}`}
							to={`/courses/${course.course_id}`}>
							<img src={`/${course.thumbnail}`} alt="" />
							<h3>{course.course_name}</h3>
						</Link>

						<Link
							aria-label={`View instructor profile for ${course.instructor_name}`}
							to={`/instructors/${course.instructor_id}`}>
							{course.instructor_name}
						</Link>

						<p>${course.price}</p>
					</StyledCourseCard>
				))}
			</StyledCourses>
		</StyledAllCoursesSection>
	);
}

export default AllCoursesPage;
