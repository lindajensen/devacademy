import styled from "styled-components";

export const StyledInstructorCard = styled.article`
	display: flex;
	flex-direction: column;
	margin: 0 auto;

	@media (min-width: 768px) {
		flex-direction: row;
	}

	img {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		object-fit: cover;

		@media (min-width: 768px) {
			width: 40%;
			border-top-left-radius: 8px;
			border-top-right-radius: 0;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 0px;
		}
	}

	/* div {
		border: 1px solid #e0e0e0;
		padding: 2rem;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		background-color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;

		@media (min-width: 768px) {
			border-top-left-radius: 0;
			border-top-right-radius: 8px;
			border-bottom-left-radius: 0px;
		}

		h1 {
			margin-bottom: 0.2rem;
		}

		p {
			text-align: justify;
		}

		p:nth-child(3) {
			margin-top: 0.4rem;
			margin-bottom: 0.8rem;
			display: inline-flex;
			align-items: center;
			gap: 0.3rem;
		}

		.rating-icon {
			color: #ffd275;
			font-size: 1.2rem;
		}

		p:nth-child(4) {
			margin-bottom: 1rem;
		}

		p:nth-child(5) {
			margin-block: 1.5rem;
			display: flex;
			flex-wrap: wrap;
			gap: 0.6rem;
		}

		p:nth-child(6) {
			margin-bottom: 1.5rem;
		}

		a {
			display: inline-flex;
			gap: 0.3rem;
			color: #333;
			margin-top: 1.5rem;

			&:hover {
				text-decoration: underline;
				text-underline-offset: 6px;
			}
		}

		.linkedin-icon {
			color: #0077b5;
			font-size: 1.2rem;
		}
	} */
`;

export const StyledInstructorContent = styled.div`
	border: 1px solid #e0e0e0;
	padding: 2rem;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;

	@media (min-width: 768px) {
		border-top-left-radius: 0;
		border-top-right-radius: 8px;
		border-bottom-left-radius: 0px;
	}

	h1 {
		margin-bottom: 0.2rem;
	}

	p {
		text-align: justify;
	}

	p:nth-child(2) {
		margin-bottom: 0.5rem;
	}

	p:nth-child(4) {
		margin-bottom: 1rem;
		margin-top: 1rem;
	}

	p:nth-child(5) {
		margin-block: 1.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	p:nth-child(6) {
		margin-bottom: 1.5rem;
	}

	a {
		display: inline-flex;
		gap: 0.3rem;
		color: #333;
		margin-top: 1.5rem;

		&:hover {
			text-decoration: underline;
			text-underline-offset: 6px;
		}
	}

	.linkedin-icon {
		color: #0077b5;
		font-size: 1.2rem;
	}
`;

export const StyledInstructorTags = styled.p`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.3rem;

	span {
		padding: 0.6rem;
		background-color: #ffd275;
		font-size: 0.75rem;
		border: none;
		border-radius: 4px;
		margin-right: 0.5rem;
	}
`;
