import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { User, CourseIncludingCompletedAndCompletedAt } from "../App";
import { DashboardData } from "../App";

import StarRating from "../components/StarRating";

import { StyledContentFallback } from "../components/styles/Global";
import {
	StyledDashboardContainer,
	StyledUserProfile,
	StyledUserGreeting,
	StyledCompletedCourses,
	StyledCompletedCourseCard,
	StyledCompletedCourseItem,
	StyledDownloadCertificateButton,
	StyledReviewForm,
	StyledOutlineButton,
	StyledRatingError,
	StyledAccountSection,
	StyledChangeAccountContainer,
	StyledDeleteAccountContainer
} from "../components/styles/DashboardPage.styled";
import { StyledErrorMessage } from "../components/styles/Modal.styled";
import { StyledSuccessMessage } from "../components/styles/SignUpPage.styled";
import {
	StyledToastMessageSuccess,
	StyledToastMessageInfo
} from "../components/styles/Global";

function DashboardPage() {
	const { id } = useParams();
	const [user, setUser] = useState<User | null>(null);
	const [courses, setCourses] = useState<
		CourseIncludingCompletedAndCompletedAt[]
	>([]);

	const [noCompletedCourses, setNoCompletedCourses] = useState(false);

	const [openReview, setOpenReview] = useState<number | null>(null);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [ratingError, setRatingError] = useState(false);
	const [alreadyReviewedMessage, setAlreadyReviewedMessage] = useState(false);
	const [reviewSubmitted, setReviewSubmitted] = useState(false);

	const [currentEmail, setCurrentEmail] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [confirmNewEmail, setConfirmNewEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [emailConfirmationError, setEmailConfirmationError] = useState(false);
	const [emailUpdateMessage, setEmailUpdateMessage] = useState(false);

	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmationError, setPasswordConfirmationError] =
		useState(false);
	const [passwordUpdateMessage, setPasswordUpdateMessage] = useState(false);
	const [isAccessDenied, setIsAccessDenied] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		fetch(`/api/dashboard/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				if (response.status === 403) {
					setIsAccessDenied(true);
					return null;
				}

				return response.json();
			})
			.then((data: DashboardData) => {
				setUser(data.user);

				const completedCourses = data.courses.filter(
					(course: CourseIncludingCompletedAndCompletedAt) => course.completed
				);

				if (completedCourses.length === 0) {
					setNoCompletedCourses(true);
				}

				setCourses(completedCourses);
			})
			.catch((error: unknown) => console.log("Error loading user", error));
	}, [id]);

	if (isAccessDenied) {
		return (
			<StyledContentFallback>
				<h1>You Don't Have Permission to View This Page</h1>
				<p>
					You're not authorized to access this dashboard. Please check that
					you're signed in with the correct account.
				</p>
			</StyledContentFallback>
		);
	}

	if (!user) {
		return (
			<StyledContentFallback>
				<h1>Session expired</h1>
				<p>Your session may have expired. Log in again to continue.</p>
			</StyledContentFallback>
		);
	}

	// LEAVE REVIEW
	function handleSubmitReview(
		event: React.FormEvent<HTMLFormElement>,
		course_id: number
	) {
		event.preventDefault();

		if (rating === 0) {
			setRatingError(true);

			setTimeout(() => {
				setRatingError(false);
			}, 5000);
		}

		if (!user) return;

		const newReview = {
			course_id: course_id,
			user_id: user.user_id,
			rating,
			comment
		};

		fetch("/api/reviews", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newReview)
		})
			.then((response) => {
				if (response.status === 201) {
					setReviewSubmitted(true);

					setTimeout(() => {
						setReviewSubmitted(false);
					}, 5000);
				} else if (response.status === 409) {
					setAlreadyReviewedMessage(true);

					setTimeout(() => {
						setAlreadyReviewedMessage(false);
					}, 5000);
				}
			})
			.catch((error: unknown) =>
				console.log(
					"An error occured while submitting the review. Please try again later.",
					error
				)
			);

		setRating(0);
		setComment("");
	}

	// DOWNLOAD CERTIFICATE
	function handleDownloadCertificate(id: number) {
		navigate(`/certificate/${id}?autodownload=true`);
	}

	// UPDATE EMAIL
	async function updateEmail(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const token = localStorage.getItem("authToken");

		if (!token) {
			console.log("No token found");
			return;
		}

		if (!user) {
			console.log("No user found");
			return;
		}

		if (currentEmail !== user.email) {
			setEmailError(true);

			setTimeout(() => {
				setEmailError(false);
			}, 5000);

			return;
		}

		if (newEmail !== confirmNewEmail) {
			setEmailConfirmationError(true);

			setTimeout(() => {
				setEmailConfirmationError(false);
			}, 5000);

			return;
		}

		const response = await fetch("/api/account/email", {
			body: JSON.stringify({ email: newEmail }),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			method: "PATCH"
		});

		setUser((prevUser) => {
			if (!prevUser) return prevUser;

			return { ...prevUser, email: newEmail };
		});

		if (response.ok) {
			setEmailUpdateMessage(true);

			setTimeout(() => {
				setEmailUpdateMessage(false);
			}, 5000);

			setCurrentEmail("");
			setNewEmail("");
			setConfirmNewEmail("");
		} else {
			console.log("Error updating email");
		}
	}

	// UPDATE PASSWORD
	async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const token = localStorage.getItem("authToken");

		if (!token) {
			console.log("No token found");
			return;
		}

		if (!user) {
			console.log("No user found");
			return;
		}

		if (currentPassword !== user.password) {
			setPasswordError(true);

			setTimeout(() => {
				setPasswordError(false);
			}, 5000);

			return;
		}

		if (newPassword !== confirmNewPassword) {
			setPasswordConfirmationError(true);

			setTimeout(() => {
				setPasswordConfirmationError(false);
			}, 5000);

			return;
		}

		const response = await fetch("/api/account/password", {
			body: JSON.stringify({ password: newPassword }),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			method: "PATCH"
		});

		if (response.ok) {
			setPasswordUpdateMessage(true);

			setTimeout(() => {
				setPasswordUpdateMessage(false);
			}, 5000);

			setCurrentPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
		} else {
			console.log("Error updating password");
		}
	}

	// DELETE ACCOUNT
	function deleteAccount() {
		const token = localStorage.getItem("authToken");

		if (!token) {
			console.log("No token found");
			return;
		}

		fetch("/api/account", {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				if (response.ok) {
					if (
						confirm(
							"Are you sure you want to delete your account? This action cannot be undone."
						)
					) {
						navigate("/");
					} else {
						return;
					}
				} else {
					throw new Error("Failed to delete account");
				}
			})
			.catch((error: unknown) => {
				console.error("Error:", error);
			});
	}

	return (
		<StyledDashboardContainer>
			<StyledUserProfile>
				<img src={`/${user.avatar}`} alt={`Avatar of ${user.name}`} />
				<p>{user.name}</p>
				<p>{user.email}</p>
				<p>{user.role}</p>
			</StyledUserProfile>

			<div>
				<StyledUserGreeting>
					<h1>Hello, {user.name}!</h1>
					<p>
						Welcome to your dashboard. Here you can update your profile, manage
						your settings, and stay up to date with your progress.
					</p>
				</StyledUserGreeting>

				<StyledCompletedCourses>
					<h2>Completed Courses</h2>
					{noCompletedCourses ? (
						<p>Ready to learn something new? Start your first course today!</p>
					) : (
						<p>
							You've already completed several courses. Well done! Let's keep
							building your skills.
						</p>
					)}

					<StyledCompletedCourseCard>
						{courses.map((course) => (
							<StyledCompletedCourseItem key={course.course_id}>
								<div>
									<h3>{course.course_name}</h3>
									<p>
										{new Date(course.completed_at).toLocaleDateString("en-GB", {
											year: "numeric",
											month: "long",
											day: "numeric"
										})}
									</p>
								</div>

								<StyledDownloadCertificateButton
									aria-label={`Download certificate for course ${course.course_name}`}
									onClick={() => handleDownloadCertificate(course.course_id)}>
									Download Certificate
								</StyledDownloadCertificateButton>

								{openReview === course.course_id ? (
									<StyledReviewForm
										onSubmit={(event) =>
											handleSubmitReview(event, course.course_id)
										}>
										<h2>Leave a Review</h2>
										<label>How would you rate this course?</label>
										<StarRating value={rating} onChange={setRating} />
										{ratingError && (
											<StyledRatingError>
												Please select at least one star
											</StyledRatingError>
										)}

										<label htmlFor={`comment-${course.course_id}`}>
											What did you think of the course? (optional)
										</label>
										<textarea
											onChange={(event) => setComment(event.target.value)}
											placeholder="Write a comment to share your experience"
											name="comment"
											id={`comment-${course.course_id}`}
											value={comment}
											cols={30}
											rows={10}></textarea>
										{alreadyReviewedMessage && (
											<StyledToastMessageInfo>
												You've already reviewed this course!
											</StyledToastMessageInfo>
										)}
										<input type="submit" value="Submit Review" />

										<StyledOutlineButton
											aria-label="Cancel review"
											type="button"
											onClick={() => setOpenReview(null)}>
											Cancel
										</StyledOutlineButton>
									</StyledReviewForm>
								) : (
									<StyledOutlineButton
										aria-label={`Leave a review for course ${course.course_name}`}
										onClick={() => setOpenReview(course.course_id)}>
										Leave a Review
									</StyledOutlineButton>
								)}
							</StyledCompletedCourseItem>
						))}
					</StyledCompletedCourseCard>

					{reviewSubmitted && (
						<StyledToastMessageSuccess>
							Review Submitted!
						</StyledToastMessageSuccess>
					)}
				</StyledCompletedCourses>

				<StyledAccountSection>
					<h2>Account Settings</h2>
					<StyledChangeAccountContainer>
						<section>
							{/* Change email */}
							<h3>Change your email</h3>
							<form onSubmit={updateEmail}>
								<label htmlFor="current-email">Current Email</label>
								<input
									id="current-email"
									onChange={(event) => setCurrentEmail(event.target.value)}
									placeholder="Enter your current email"
									required
									type="email"
									value={currentEmail}
								/>
								{emailError && (
									<StyledErrorMessage>
										Hmm, we couldn't find that email. Double-check and try
										again.
									</StyledErrorMessage>
								)}

								<label htmlFor="new-email">New Email</label>
								<input
									id="new-email"
									onChange={(event) => setNewEmail(event.target.value)}
									placeholder="Enter your new email"
									required
									type="email"
									value={newEmail}
								/>

								<label htmlFor="confirm-email">Confirm New Email</label>
								<input
									id="confirm-email"
									onChange={(event) => setConfirmNewEmail(event.target.value)}
									placeholder="Confirm your new email"
									required
									type="email"
									value={confirmNewEmail}
								/>
								{emailConfirmationError && (
									<StyledErrorMessage>
										Looks like a mismatch. Please make sure both emails are
										identical.
									</StyledErrorMessage>
								)}
								<input
									aria-label="Save email changes"
									type="submit"
									value="Save Changes"
								/>
								{emailUpdateMessage && (
									<StyledSuccessMessage>
										Success! Your new email is now saved.
									</StyledSuccessMessage>
								)}
							</form>
						</section>

						<section>
							{/* Change password */}
							<h3>Change your password</h3>
							<form onSubmit={updatePassword}>
								<label htmlFor="current-password">Current Password</label>
								<input
									id="current-password"
									onChange={(event) => setCurrentPassword(event.target.value)}
									placeholder="Enter your current password"
									required
									type="password"
									value={currentPassword}
								/>
								{passwordError && (
									<StyledErrorMessage>
										Oops, you've entered the wrong password.
									</StyledErrorMessage>
								)}

								<label htmlFor="new-password">New Password</label>
								<input
									id="new-password"
									onChange={(event) => setNewPassword(event.target.value)}
									placeholder="Enter your new password"
									required
									type="password"
									value={newPassword}
								/>

								<label htmlFor="confirm-password">Confirm New Password</label>
								<input
									id="confirm-password"
									onChange={(event) =>
										setConfirmNewPassword(event.target.value)
									}
									placeholder="Confirm your new password"
									required
									type="password"
									value={confirmNewPassword}
								/>
								{passwordConfirmationError && (
									<StyledErrorMessage>
										Mismatch between new and confirmed password.
									</StyledErrorMessage>
								)}
								<input
									aria-label="Save password changes"
									type="submit"
									value="Save Changes"
								/>
								{passwordUpdateMessage && (
									<StyledSuccessMessage>
										Your password has been updated successfully.
									</StyledSuccessMessage>
								)}
							</form>
						</section>
					</StyledChangeAccountContainer>

					<StyledDeleteAccountContainer>
						<h3>Delete Account</h3>
						<div>
							<p>
								This action will permanently delete your account and cannot be
								undone.
							</p>
							<button aria-label="Delete account" onClick={deleteAccount}>
								Delete Account
							</button>
						</div>
					</StyledDeleteAccountContainer>
				</StyledAccountSection>
			</div>
		</StyledDashboardContainer>
	);
}

export default DashboardPage;
