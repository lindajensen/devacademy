import styled from "styled-components";

export const StyledHowItWorksSection = styled.section`
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
	text-align: center;
`;

export const StyledHowItWorksWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 2rem;
	margin-top: 2rem;
	max-width: 75rem;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}

	div {
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border: 1px solid #e0e0e0;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		}

		svg {
			color: #4fbcff;
			margin-bottom: 0.5rem;
		}

		h3 {
			font-size: 1.25rem;
			margin-bottom: 0.5rem;
			color: #040e1b;
		}

		p {
			color: #555;
			font-size: 0.9rem;
		}
	}
`;
