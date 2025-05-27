import { FaStar, FaRegStar } from "react-icons/fa";

import { StyledStarRatingWrapper } from "./styles/StarRating.styled";

export interface StarDisplayProps {
	rating: number;
}

function StarDisplay({ rating }: StarDisplayProps) {
	const stars = Array(5).fill(0);

	return (
		<StyledStarRatingWrapper>
			{stars.map((_, index) => {
				if (index + 1 <= rating) {
					return (
						<span key={index}>
							<FaStar color="#ffd275" size={24} />
						</span>
					);
				} else {
					return (
						<span key={index}>
							<FaRegStar color="#d4d4d4" size={24} />
						</span>
					);
				}
			})}
		</StyledStarRatingWrapper>
	);
}

export default StarDisplay;
