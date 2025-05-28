import styled from "styled-components";

export const StyledCourseDetailsCard = styled.article`
	display: flex;
	flex-direction: column;
	margin: 0 auto;

	@media (min-width: 768px) {
		flex-direction: row;
	}

	h1 {
		margin-bottom: 1.2rem;
	}

	img {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		object-fit: cover;

		@media (min-width: 768px) {
			width: 40%;
			border-top-left-radius: 8px;
			border-top-right-radius: 0;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 0px;
		}
	}

	.card-wrapper {
		border: 1px solid #e0e0e0;
		padding: 1rem;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		background-color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;

		@media (min-width: 768px) {
			padding: 2rem;
			border-top-left-radius: 0;
			border-top-right-radius: 8px;
			border-bottom-left-radius: 0px;
		}

		p {
			text-align: justify;
		}

		p:nth-child(4) {
			margin-bottom: 1rem;
		}

		a {
			display: inline-flex;
			gap: 0.3rem;
			color: #333;
			margin-block: 1.5rem;

			&:hover {
				text-decoration: underline;
				text-underline-offset: 6px;
			}
		}

		a:hover {
			text-decoration: underline;
			text-underline-offset: 6px;
		}

		p:nth-child(3) {
			margin-top: 1rem;
		}

		button:first-of-type {
			background-color: transparent;
			border: none;
			margin-block: 0.8rem;
		}

		button:first-of-type:hover {
			text-decoration: underline;
			text-underline-offset: 6px;
		}

		p:nth-child(5) {
			margin-bottom: 1.5rem;
		}

		button:last-of-type {
			background-color: #040e1b;
			color: #fff;
			padding: 0.8rem 1rem;
			border: none;
			border-radius: 4px;
			width: 100%;
			margin-block: 0.6rem;

			&:hover {
				background-color: #112744;
			}

			&:active {
				background-color: #020a14;
			}

			@media (min-width: 768px) {
				width: 50%;
			}
		}
	}
`;

export const StyledCategoryTags = styled.p`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;

	span {
		padding: 0.6rem;
		background-color: #ffd275;
		font-size: 0.75rem;
		border: none;
		border-radius: 4px;
		margin-right: 0.5rem;
	}
`;

export const StyledReviewsSection = styled.article`
	margin-top: 2rem;

	h2 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}
`;

export const StyledRatingContainer = styled.div`
	border: 1px solid #e0e0e0;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1rem;

	.rating-icon {
		color: #f5c518;
		margin-right: 0.25rem;
	}

	.rating-icon {
		color: #ffd275;
		font-size: 1.2rem;
	}

	p:nth-child(3) {
		margin-bottom: 1rem;
	}

	p:nth-child(4) {
		text-align: right;
	}
`;

export const StyledNoReviewsParagraph = styled.p`
	border: 1px dashed #ccc;
	background-color: #f9f9f9;
	padding: 1rem;
	margin-bottom: 0.5rem;
	border-radius: 6px;
	color: #555;
	font-style: italic;
`;
