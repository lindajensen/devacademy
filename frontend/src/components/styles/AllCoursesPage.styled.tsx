import styled from "styled-components";

export const StyledAllCoursesSection = styled.section`
	p:nth-child(2) {
		margin-bottom: 1.5rem;
	}

	h2 {
		margin-bottom: 0.5rem;
	}
`;

export const StyledCourses = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));
	row-gap: 1rem;
	column-gap: 2rem;
`;

export const StyledCourseCard = styled.article`
	img {
		width: 100%;
		height: 12.5rem;
		object-fit: cover;
	}

	a {
		color: #555;
	}

	a:nth-child(2):hover {
		text-decoration: underline;
		text-underline-offset: 8px;
	}

	p:last-of-type {
		text-align: right;
	}

	h3 {
		margin-bottom: 0.2rem;
	}
`;
