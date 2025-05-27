import styled from "styled-components";

export const StyledBannerSection = styled.section`
	background-color: #040e1b;
	color: #fff;
	border-radius: 8px;
	margin-top: 1.5rem;
	padding: 2rem 2rem 2.5rem 2rem;
	text-align: center;

	@media (min-width: 768px) {
		text-align: left;
	}

	h2 {
		color: #fff;
	}

	p {
		margin-bottom: 1.5rem;
	}

	a {
		background-color: #4fbcff;
		color: #fff;
		padding: 0.4rem 0.8rem;
		border: 2px solid transparent;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: #80d6ff;
		}

		&:active {
			background-color: #239fcc;
		}
	}
`;
