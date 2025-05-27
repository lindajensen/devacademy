import styled from "styled-components";

export const StyledModalContent = styled.div`
	background: #fff;
	padding: 2rem;
	border-radius: 12px;
	width: 90%;
	margin: 0 auto;
	max-width: 25rem;
	box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);

	h2 {
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		text-align: center;
		font-size: 1.3rem;
	}

	.login-details {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	input[type="text"],
	input[type="password"] {
		display: block;
		width: 100%;
		margin-bottom: 0.8rem;
		margin-top: 0.3rem;
		border-radius: 4px;
		padding: 0.6rem;
		border: 1px solid #e0e0e0;
	}

	input[type="submit"] {
		margin-top: 0.5rem;
		background-color: #040e1b;
		color: #fff;
		padding: 0.8rem 1rem;
		border: none;
		border-radius: 4px;
		width: 100%;
		cursor: pointer;

		&:hover {
			background-color: #122744;
		}

		&:active {
			background-color: #020a14;
		}
	}

	div {
		text-align: center;
	}

	div > p {
		margin-top: 1rem;
	}

	div > p,
	a {
		display: inline-block;
		margin-right: 0.313rem;
		font-size: 0.8rem;
	}

	a {
		cursor: pointer;

		&:hover {
			text-decoration: underline;
			text-underline-offset: 6px;
		}
	}
`;

// export const StyledOverlay = {
// 	overlay: {
// 		backgroundColor: "rgba(0, 0, 0, 0.6)"
// 	},
// 	content: {
// 		marginTop: "5%"
// 	}
// };

export const StyledIconWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
		text-underline-offset: 6px;
	}

	svg {
		font-size: 1.2rem;
	}
`;

export const StyledErrorMessage = styled.p`
	color: #ef605a;
	font-style: italic;
	margin-bottom: 1rem;
`;

export const StyledLoginErrorMessage = styled.p`
	color: #ef605a;
	font-style: italic;
	margin-top: 1rem;
	text-align: center;
`;
