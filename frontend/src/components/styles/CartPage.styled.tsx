import styled from "styled-components";

export const StyledCartWrapper = styled.div`
	max-width: 75rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

export const StyledCartList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (min-width: 768px) {
		flex-grow: 1;
	}
`;

export const StyledCartItem = styled.li`
	display: flex;
	align-items: center;
	background-color: transparent;
	border: 1px solid #e0e0e0;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 1.25rem;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

	a:hover {
		text-decoration: underline;
		text-underline-offset: 6px;
	}

	h2 {
		font-size: 1.1rem;
		margin-bottom: 0.4rem;
	}

	div {
		flex-grow: 1;
	}

	p:last-of-type {
		margin-top: 1rem;
	}

	button {
		background-color: transparent;
		border: none;
		font-size: 1.2rem;
		cursor: pointer;

		&:hover {
			color: #040e1b;
		}
	}
`;

export const StyledCartSummary = styled.aside`
	min-width: 15.625rem;
	padding: 1.5rem;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

	h3 {
		margin-bottom: 1rem;
		text-align: right;
	}

	button {
		width: 100%;
		margin-top: 0.5rem;
		background-color: #040e1b;
		color: #fff;
		padding: 0.8rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: #122744;
		}

		&:active {
			background-color: #020a14;
		}
	}
`;

export const StyledEmptyCartMessage = styled.p`
	width: 100%;
	padding: 2rem;
	text-align: center;
	margin: 0 auto;
	border-radius: 8px;
	border: 1px solid #e0e0e0;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
