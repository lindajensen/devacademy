import styled from "styled-components";

export const StyledHeader = styled.header`
	padding-bottom: 2rem;
`;

export const StyledNavContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const StyledLogo = styled.div`
	a {
		font-size: 1.5rem;
		font-weight: bold;
	}
`;

export const StyledHamburgerWrapper = styled.div`
	display: none;

	@media (max-width: 768px) {
		display: block;
	}
`;

export const StyledNavLinks = styled.nav<{ $isOpen: boolean }>`
	display: flex;
	align-items: ${({ $isOpen }) => ($isOpen ? "flex-end" : "center")};
	gap: 1rem;

	a {
		color: #333;
		text-decoration: none;
		text-align: right;
	}

	a:hover {
		text-decoration: underline;
		text-underline-offset: 6px;
	}

	div:last-of-type {
		display: flex;
		justify-content: flex-end;
	}

	@media (max-width: 768px) {
		position: absolute;
		top: 4.375rem;
		right: 0;
		width: 100%;
		background-color: #040e1b;
		background-color: #fff;
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
		display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
		z-index: 999;
	}
`;

export const StyledPrimaryDarkButton = styled.button`
	background-color: #040e1b;
	border: none;
	display: inline-flex;
	color: #fff;
	padding: 0.5rem 1rem;
	border: 1px solid transparent;
	border-radius: 4px;
	margin-right: 0.75rem;
	cursor: pointer;

	&:hover {
		background-color: #112744;
	}

	&:active {
		background-color: #020a14;
	}
`;

export const StyledButtonWrapper = styled.div`
	a {
		display: inline-flex;
		align-items: center;
		background-color: transparent;
		color: #333;
		padding: 0.5rem 1rem;
		border: 1px solid #040e1b;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			text-decoration: none;
			background-color: #040e1b;
			color: #fff;
		}

		&:active {
			background-color: #1f2a38;
		}

		svg {
			font-size: 1rem;
			margin-right: 0.375rem;
		}
	}
`;
