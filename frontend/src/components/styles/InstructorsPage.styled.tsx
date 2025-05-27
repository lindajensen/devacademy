import styled from "styled-components";

export const StyledInstructorSection = styled.section`
	p:nth-child(2) {
		margin-bottom: 1.5rem;
	}

	div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
		gap: 1.5rem;
	}
`;

export const StyledInstructorCard = styled.article`
	border: 1px solid #e0e0e0;
	padding: 1.25rem;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}

	img {
		border-radius: 4px;
	}

	h2 {
		font-size: 1.2rem;
		margin-top: 1rem;
		margin-bottom: 0.3rem;
	}

	p {
		color: #555;
	}

	p:first-of-type {
		margin-bottom: 1rem;
	}

	p:last-of-type {
		margin-bottom: 2rem;
		text-align: left;
		margin-top: 0.8rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	span {
		padding: 0.6rem;
		background-color: #ffd275;
		font-size: 0.75rem;
		border: none;
		border-radius: 4px;
	}

	a {
		display: block;
		color: #333;
		text-align: right;

		&:hover {
			text-decoration: underline;
			text-underline-offset: 6px;
		}
	}

	a svg {
		vertical-align: middle;
		margin-left: 6px;
	}
`;
