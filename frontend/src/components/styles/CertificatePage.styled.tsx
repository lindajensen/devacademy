import styled from "styled-components";

export const StyledCertificateWrapper = styled.section`
	width: 70.188rem;
	height: 49.625rem;
	background-color: #f9f6f1;
`;

export const StyledCertificateSection = styled.div`
	display: grid;
	place-items: center;
	min-height: 100%;

	h1 {
		margin-top: 2rem;
	}
`;

export const StyledCertificateContent = styled.div`
	text-align: center;
	padding: 4rem;

	p:nth-child(2) {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	h4 {
		margin-top: 2rem;
		font-size: 1.1rem;
	}
`;

export const StyledCoreTopics = styled.p`
	margin-block: 1rem;
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;

	span {
		display: inline-block;
		padding: 0.4rem 0.6rem 1rem 0.6rem;
		border-radius: 1.25rem;
		border: 2px solid #ddd;
		font-size: 0.75rem;
		margin-top: 0.5rem;
		margin-right: 0.5rem;
	}
`;

export const StyledSignature = styled.p`
	font-family: "Parisienne", cursive;
	font-size: 2rem;
	margin-top: 3rem;
`;

export const StyledFallbackMessage = styled.p`
	background-color: #ffd275;
	padding: 1rem 1.5rem;
	border-radius: 6px;
	font-size: 1rem;
	text-align: center;
	max-width: 37.5rem;
	margin: 2rem auto;
`;
