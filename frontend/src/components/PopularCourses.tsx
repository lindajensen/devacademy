import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CourseIncludingInstructorAndRating } from "../App";

import {
	StyledPopularCourses,
	StyledCourseCard,
	StyledScrollableRow
} from "./styles/PopularCourses.styled";

function PopularCourses() {
	const [courses, setCourses] = useState<CourseIncludingInstructorAndRating[]>(
		[]
	);

	const backendBaseUrl = import.meta.env.DEV ? "http://localhost:3000" : "";

	// FETCH POPULAR COURSES
	useEffect(() => {
		fetch("/api/landing-page")
			.then((response) => response.json())
			.then((data: CourseIncludingInstructorAndRating[]) => {
				const popularCourses: CourseIncludingInstructorAndRating[] =
					data.filter(function (course: CourseIncludingInstructorAndRating) {
						return course.average_rating > 3;
					});

				setCourses(popularCourses);
			})
			.catch((error: unknown) => console.log("Error fetching courses:", error));
	}, []);

	return (
		<StyledPopularCourses>
			<h2>Popular Courses</h2>
			<StyledScrollableRow>
				{courses.map((course) => (
					<StyledCourseCard key={course.course_id}>
						<Link
							aria-label={`View details for the course ${course.course_name}`}
							to={`/courses/${course.course_id}`}>
							<img
								src={`${backendBaseUrl}/${course.thumbnail}`}
								alt={course.course_name}
							/>
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
			</StyledScrollableRow>
		</StyledPopularCourses>
	);
}

export default PopularCourses;
