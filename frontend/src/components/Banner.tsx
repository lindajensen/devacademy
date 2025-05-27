import { Link } from "react-router-dom";
import { StyledBannerSection } from "./styles/Banner.styled";

function Banner() {
	return (
		<StyledBannerSection>
			<h2>Ready to start learning?</h2>
			<p>
				Get instant access to all courses and start learning at your own pace.
				Cancel anytime, no commitment.
			</p>
			<Link to="/sign-up">Start 14 day free trial</Link>
		</StyledBannerSection>
	);
}

export default Banner;
