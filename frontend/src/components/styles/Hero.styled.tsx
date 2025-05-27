import styled from "styled-components";

export const StyledHeroSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: #040e1b;
	color: #fff;
	border-radius: 8px;

	h1 {
		color: #fff;
	}

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
	}

	img {
		margin-bottom: 1rem;
		@media (min-width: 768px) {
			width: 60%;
		}
	}

	> div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		margin-bottom: 1rem;
	}
`;

export const StyledActionButtons = styled.div`
	margin-top: 1.5rem;
	display: flex;
	gap: 0.6rem;
	align-items: center;
	justify-content: center;

	// Sign Up Button
	a:first-of-type {
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

	// Browse Courses Button
	a:last-of-type {
		background-color: transparent;
		padding: 0.4rem 0.8rem;
		color: #fff;
		border: 2px solid #fff;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: #f0f0f0;
			color: #222;
		}

		&:active {
			background-color: #e0e0e0;
			color: #333;
		}
	}
`;
