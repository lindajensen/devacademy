import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import StarDisplay from "../components/StarDisplay";

import { Course, CourseIncludingInstructorAndRating, Review } from "../App";

import {
	StyledContentFallback,
	StyledToastMessageSuccess,
	StyledToastMessageInfo
} from "../components/styles/Global";

import {
	StyledCourseDetailsCard,
	StyledCategoryTags,
	StyledReviewsSection,
	StyledNoReviewsParagraph,
	StyledRatingContainer
} from "../components/styles/CourseDetailsPage.styled";

function CourseDetailsPage() {
	const { course_id } = useParams();

	const [review, setReview] = useState<Review | null>(null);
	const [course, setCourse] =
		useState<CourseIncludingInstructorAndRating | null>(null);
	const [showFullDescription, setShowFullDescription] = useState(false);

	const [, setCart] = useState<Course[]>(
		JSON.parse(localStorage.getItem("cart") || "[]")
	);
	const [addedToCartMessage, setAddedToCartMessage] = useState(false);
	const [alreadyInCartMessage, setAlreadyInCartMessage] = useState(false);

	const backendBaseUrl = import.meta.env.DEV ? "http://localhost:3000" : "";

	// SCROLL WHEN LOADING COMPONENT
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [course_id]);

	useEffect(() => {
		if (!course_id) return;

		fetch(`/api/reviews/${course_id}`)
			.then((response) => response.json())
			.then((data: Review[]) => setReview(data[0] ?? null))
			.catch((error: unknown) => console.log("Error loading reviews", error));
	}, [course_id]);

	useEffect(() => {
		fetch(`/api/courses/${course_id}`)
			.then((response) => response.json())
			.then((data: CourseIncludingInstructorAndRating) => setCourse(data))
			.catch((error: unknown) => console.log("Error loading course", error));
	}, [course_id]);

	if (!course) {
		return (
			<StyledContentFallback>
				<h2>Course not found</h2>
				<p>
					We couldn't load the course details. Try refreshing the page or browse
					our other available courses.
				</p>
			</StyledContentFallback>
		);
	}

	let description = course.course_description;

	if (!showFullDescription) {
		description = description.substring(0, 200) + "...";
	}

	function addToCart(course: Course) {
		if (!course) {
			return;
		}

		setCart((prevCart) => {
			const courseAlreadyInCart = prevCart.some(
				(item) => item.course_id === course.course_id
			);

			if (courseAlreadyInCart) {
				setAlreadyInCartMessage(true);

				setTimeout(() => {
					setAlreadyInCartMessage(false);
				}, 3000);
				return prevCart;
			}

			const updatedCart = [...prevCart, course];
			setAddedToCartMessage(true);

			setTimeout(() => {
				setAddedToCartMessage(false);
			}, 3000);

			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	}

	return (
		<section>
			<StyledCourseDetailsCard>
				<img src={`${backendBaseUrl}/${course.thumbnail}`} alt="" />

				<div className="card-wrapper">
					<h1>{course.course_name}</h1>
					<StyledCategoryTags>
						{course.category.split(",").map((category, index) => (
							<span key={index}>{category}</span>
						))}
					</StyledCategoryTags>

					<Link
						aria-label={`View instructor profile for ${course.instructor_name}`}
						to={`/instructors/${course.instructor_id}`}>
						{course.instructor_name}
					</Link>
					<p>{description}</p>
					<button
						aria-label={
							showFullDescription
								? "Show less of the course description"
								: "Show full course description"
						}
						onClick={() => setShowFullDescription((prevState) => !prevState)}>
						{showFullDescription ? "Less" : "More"}
					</button>

					<StyledReviewsSection>
						<h2>Reviews</h2>
						{review ? (
							<div>
								<StyledRatingContainer>
									<p>
										{new Date(review.created_at).toLocaleDateString("en-GB", {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric"
										})}
									</p>

									<StarDisplay rating={review.rating} />

									<p>{review.comment}</p>
								</StyledRatingContainer>
							</div>
						) : (
							<StyledNoReviewsParagraph>
								No reviews found for this course.
							</StyledNoReviewsParagraph>
						)}
					</StyledReviewsSection>

					<button
						aria-label={`Add course ${course.course_name} to cart`}
						onClick={() => addToCart(course)}>
						Add to Cart
					</button>

					{addedToCartMessage && (
						<StyledToastMessageSuccess>
							Course added to cart!
						</StyledToastMessageSuccess>
					)}
					{alreadyInCartMessage && (
						<StyledToastMessageInfo>
							This course is already in your cart!
						</StyledToastMessageInfo>
					)}
				</div>
			</StyledCourseDetailsCard>
		</section>
	);
}

export default CourseDetailsPage;
