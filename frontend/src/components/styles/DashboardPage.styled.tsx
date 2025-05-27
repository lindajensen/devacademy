import styled from "styled-components";

export const StyledDashboardContainer = styled.main`
	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1.5rem;
	}
`;

export const StyledUserProfile = styled.div`
	background-color: #ffd275;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	margin-bottom: 1rem;
	padding: 1.2rem;

	@media (min-width: 768px) {
		justify-content: flex-start;
		margin-bottom: 0;
	}

	img {
		width: 180px;
		border-radius: 50%;
		margin-bottom: 1rem;
	}

	p:first-of-type {
		font-weight: bold;
	}
`;

export const StyledUserGreeting = styled.section`
	background-color: #f5f7fa;
	padding: 1.2rem;
	margin-bottom: 1rem;
	border-radius: 8px;

	h1 {
		font-size: 1.8rem;
	}
`;

export const StyledCompletedCourses = styled.section`
	background-color: #f5f7fa;
	padding: 1.2rem;
	border-radius: 8px;
	margin-bottom: 1rem;

	p {
		margin-bottom: 1rem;
	}
`;

export const StyledCompletedCourseCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	h3 {
		margin-top: 0.2rem;
	}
`;

export const StyledCompletedCourseItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	background-color: #fff;
	padding: 1rem 0.6rem 0.8rem 1rem;
	border-radius: 8px;
`;

export const StyledDownloadCertificateButton = styled.button`
	background-color: #040e1b;
	color: #fff;
	padding: 0.5rem 1rem;
	border: 1px solid transparent;
	border-radius: 4px;
	margin-right: 0.75rem;
	cursor: pointer;
	width: 100%;
	max-width: 20rem;

	&:hover {
		background-color: #112744;
	}

	&:active {
		background-color: #020a14;
	}
`;

export const StyledReviewForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	margin-top: 1rem;

	h2 {
		margin-bottom: 0;
	}

	textarea,
	input[type="text"] {
		width: 100%;
		padding: 0.5rem;
		font-family: "Open Sans", sans-serif;
		font-size: 0.9rem;
		color: #333;
		border-radius: 0.2rem;
		border: 1px solid #0e0e0e;
	}

	input[type="submit"] {
		background-color: #040e1b;
		border: none;
		color: #fff;
		padding: 0.5rem 1rem;
		border: 1px solid transparent;
		border-radius: 4px;
		margin-right: 0.75rem;
		cursor: pointer;
		width: 100%;
		max-width: 20rem;

		&:hover {
			background-color: #112744;
		}

		&:active {
			background-color: #020a14;
		}
	}
`;

export const StyledOutlineButton = styled.button`
	background-color: transparent;
	padding: 0.4rem 0.8rem;
	border: 2px solid #040e1b;
	border-radius: 4px;
	cursor: pointer;
	width: 100%;
	max-width: 20rem;

	&:hover {
		background-color: #040e1b;
		color: #fff;
	}

	&:active {
		background-color: #020a14;
	}
`;

export const StyledRatingError = styled.p`
	color: #ef605a;
	font-style: italic;
`;

export const StyledAccountSection = styled.div`
	background-color: #f5f7fa;
	padding: 1.2rem;
	border-radius: 8px;

	h2 {
		font-size: 1.5rem;
		margin-bottom: 0;
	}
`;

export const StyledChangeAccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	h3 {
		margin-bottom: 0.9rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		background-color: #fff;
		padding: 1rem 0.6rem 0.8rem 1rem;
		border-radius: 8px;
	}

	label {
		margin-bottom: 0.5rem;
	}

	input {
		margin-bottom: 0.8rem;
		border-radius: 4px;
		padding: 0.6rem;
		border: 1px solid #e0e0e0;
		width: 100%;
	}

	input[type="submit"] {
		margin-top: 1rem;
		background-color: #040e1b;
		color: #fff;
		padding: 0.8rem 1rem;
		border: none;
		border-radius: 4px;
		width: 100%;
		cursor: pointer;
		max-width: 20rem;

		&:hover {
			background-color: #122744;
		}

		&:active {
			background-color: #020a14;
		}
	}
`;

export const StyledDeleteAccountContainer = styled.section`
	margin-top: 2rem;

	div {
		background-color: #fff;
		padding: 1rem 0.6rem 0.8rem 1rem;
		border-radius: 8px;
	}

	h3 {
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: 1rem;
	}

	button {
		margin-top: 1rem;
		background-color: #e53935;
		color: #fff;
		padding: 0.8rem 1rem;
		border: none;
		border-radius: 4px;
		width: 100%;
		cursor: pointer;
		max-width: 20rem;

		&:hover {
			background-color: #ef5350;
		}

		&:active {
			background-color: #c62828;
		}
	}
`;
