import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Open Sans", sans-serif;
    font-size: 0.9rem;
    color: #333;
  }

  h1 {
    font-family: "Merriweather", serif;
    font-size: 2rem;
    margin-bottom: 0.8rem;
    color: #111;
  }

  h2 {
    font-family: "Merriweather", serif;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    color: #111;
  }

  h3 {
    font-family: "Merriweather", serif;
    font-size: 1.1rem;
    margin-top: 0.8rem;
    color: #111;
  }

  p {
    line-height: 1.5
  }

  a {
    text-decoration: none;
    font-size: 0.9rem;
    color: #333;
  }

  a:visited {
    color: inherit;
  }

  ul {
    list-style-type: none;
  }

  button {
    font-family: "Open Sans", sans-serif;
    color: #333;
  }

  img {
    max-width: 100%;
    display: block;
    border-radius: 8px;
  }
`;

export const StyledContentFallback = styled.div`
	max-width: 1200px;
	margin: 4rem auto;
	padding: 2rem;
	text-align: center;
	/* background-color: #f5f7fa; */
	border-radius: 8px;
	border: 1px solid #e0e0e0;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	h2 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
		color: #333;
	}

	p {
		font-size: 1rem;
		color: #555;
	}
`;

export const StyledToastMessageSuccess = styled.p`
	position: fixed;
	top: 1.5rem;
	right: 1.5rem;
	background-color: #040e1b;
	color: #333;
	color: #fff;
	padding: 0.75rem 1rem;
	border-radius: 6px;
	font-size: 0.9rem;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	z-index: 1000;
`;

export const StyledToastMessageInfo = styled.p`
	position: fixed;
	top: 1.5rem;
	right: 1.5rem;
	background-color: #fce4e4;
	background-color: #ef605a;
	background-color: #ffd275;
	color: #333;
	padding: 0.75rem 1rem;
	border-radius: 6px;
	font-size: 0.9rem;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	z-index: 1000;
`;
