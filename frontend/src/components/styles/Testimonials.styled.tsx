import styled from "styled-components";

export const StyledTestimonialsSection = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1.5rem;
	background-color: #ffd275;
	border-radius: 8px;

	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
	}

	a {
		background-color: #040e1b;
		display: inline-flex;
		padding: 0.5rem 1rem;
		border: 1px solid transparent;
		border-radius: 4px;
		margin-right: 0.75rem;
		cursor: pointer;
		color: #fff;

		&:hover {
			background-color: #122744;
		}

		&:active {
			background-color: #020a14;
		}
	}
`;

export const StyledTestimonialIntro = styled.div`
	text-align: center;
	flex: 0.7;

	p {
		padding-top: 1.2rem;
		margin-bottom: 0.3rem;
	}

	h2 {
		font-size: 1.3rem;
		padding-inline: 1.2rem;
	}
`;

export const StyledTestimonialsWrapper = styled.div`
	margin-top: 0.5rem;
	flex: 1;

	blockquote {
		background-color: #fff;
		margin: 1.2rem;
		padding: 0.3rem 1.2rem 1.2rem 1.2rem;
		border-radius: 6px;

		h3 {
			margin-bottom: 0.5rem;
		}

		footer {
			text-align: right;
			margin-top: 0.5rem;
			font-style: italic;
		}
	}
`;
