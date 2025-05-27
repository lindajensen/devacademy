import styled from "styled-components";

export const StyledSignUpWrapper = styled.div`
	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	@media (min-width: 930px) {
		grid-template-columns: 2fr 3fr;
	}

	h1 {
		margin-bottom: 2rem;
	}

	section > p:first-of-type {
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.2rem;
		margin-bottom: 0.3rem;
	}
`;

export const StyledIconWrapper = styled.div`
	display: flex;

	svg {
		font-size: 1.2rem;
		margin-right: 0.375rem;
	}
`;

export const StyledFormSection = styled.section`
	border: 1px solid #333;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1.8rem;
	background-color: #f5f7fa;
	border-radius: 8px;
	border: none;

	@media (min-width: 930px) {
		padding: 4rem;
	}

	div {
		width: 100%;
	}

	h2 {
		margin-bottom: 1rem;
		text-align: center;
		padding-inline: 0;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.3rem;
	}

	input[type="text"],
	input[type="password"] {
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

		&:hover {
			background-color: #112744;
		}

		&:active {
			background-color: #020a14;
		}
	}
`;

export const StyledErrorMessage = styled.p`
	color: #ef605a;
	font-style: italic;
`;

export const StyledSuccessMessage = styled.p`
	margin-top: 1rem;
	color: #388e3c;
	font-style: italic;
`;
