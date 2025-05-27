import styled from "styled-components";

export const StyledFooter = styled.footer`
	margin: auto;
	display: flex;
	flex-direction: column;
	text-align: center;
	margin-top: 2rem;
	border-top: 1px solid #333;

	div {
		display: flex;
		flex-direction: column;
		margin-top: 1.5rem;
	}

	p {
		font-weight: bold;
		font-size: 1rem;
		font-family: "Merriweather", serif;
		margin-bottom: 0.5rem;
	}

	.footer-logo {
		font-size: 1.5rem;
		font-weight: bold;
	}

	li {
		margin-bottom: 0.5rem;
	}

	a:hover {
		text-decoration: underline;
		text-underline-offset: 6px;
	}

	small {
		font-size: 0.75rem;
	}

	@media (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
		gap: 4rem;

		.footer-links {
			margin-left: auto;
		}
	}
`;
