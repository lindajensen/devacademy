import styled from "styled-components";

export const StyledInstructorSpotlightSection = styled.section`
	h2 {
		text-align: center;
		margin-top: 2rem;
		margin-bottom: 1.5rem;
	}
`;

export const StyledScrollableRow = styled.div`
	display: flex;
	overflow-x: auto;
	gap: 1rem;
	scroll-snap-type: x mandatory;
	padding-bottom: 1rem;

	&::-webkit-scrollbar {
		height: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ccc;
		border-radius: 4px;
	}

	scroll-behavior: smooth;
`;

export const StyledInstructorCard = styled.div`
	display: flex;
	flex: 0 0 auto;
	scroll-snap-align: start;
	margin: 0 auto;

	button {
		border: none;
		background-color: transparent;
		padding: 1.2rem 0 1.2rem 0;
	}
`;

export const StyledImage = styled.img<{ $isActive: boolean }>`
	border: 5px solid
		${({ $isActive }) => ($isActive ? "#ffd275" : "transparent")};
	border-radius: 50%;
	width: 150px;
	margin-bottom: 0.5rem;

	button:hover & {
		transform: scale(1.05);
	}
`;

export const StyledInstructorQuote = styled.div`
	position: relative;
	background-color: #f9f9f9;
	padding: 1.5rem 1.5rem 1rem 3rem;
	border-radius: 8px;
	font-style: italic;
	color: #333;
	line-height: 1.6;

	@media (min-width: 768px) {
		padding: 1.5rem 14rem 1rem 16rem;
	}

	&::before {
		content: "❝";
		position: absolute;
		left: 1rem;
		top: 0.5rem;
		font-size: 2rem;
		color: #777;

		@media (min-width: 768px) {
			left: 14rem;
		}
	}

	footer {
		margin-top: 1rem;
		font-style: normal;
		font-weight: bold;
		color: #555;
		text-align: right;
	}
`;
