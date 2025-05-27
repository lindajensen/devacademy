import { FaStar, FaRegStar } from "react-icons/fa";

import { StyledStarRatingWrapper } from "./styles/StarRating.styled";

export interface RatingProps {
	value: number;
	onChange: (value: number) => void;
}

function StarRating({ value, onChange }: RatingProps) {
	const stars = Array(5).fill(0);

	return (
		<StyledStarRatingWrapper>
			{stars.map((_, index) => {
				if (index + 1 <= value) {
					return (
						<span key={index} onClick={() => onChange(index + 1)}>
							<FaStar color="#ffd275" size={24} />
						</span>
					);
				} else {
					return (
						<span key={index} onClick={() => onChange(index + 1)}>
							<FaRegStar color="#d4d4d4" size={24} />
						</span>
					);
				}
			})}
		</StyledStarRatingWrapper>
	);
}

export default StarRating;
