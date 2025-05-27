import { Link } from "react-router-dom";
import { StyledFooter } from "./styles/Footer.styled";

function Footer() {
	return (
		<StyledFooter>
			<div>
				<p className="footer-logo">DevAcademy</p>
				<small> &copy;2025</small>
			</div>

			<div className="footer-links">
				<p>About</p>
				<ul>
					<li>
						<Link aria-label="Visit the about us page" to="#">
							About Us
						</Link>
					</li>
					<li>
						<Link aria-label="Learn about our team" to="#">
							Our Team
						</Link>
					</li>
					<li>
						<Link aria-label="View company news and recent updates" to="#">
							News
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<p>Connect</p>
				<ul>
					<li>
						<Link aria-label="Read our blog posts and articles" to="#">
							Blog
						</Link>
					</li>
					<li>
						<Link
							aria-label="Get in touch with us through the contact page"
							to="#">
							Contact Us
						</Link>
					</li>
					<li>
						<Link
							aria-label="Visit the help center for support and frequently asked questions"
							to="#">
							Help Center
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<p>Products</p>
				<ul>
					<li>
						<Link
							aria-label="View our pricing plans and subscription options"
							to="#">
							Our Plans
						</Link>
					</li>
					<li>
						<Link aria-label="Explore learning resources and materials" to="#">
							Resourses
						</Link>
					</li>
					<li>
						<Link
							aria-label="Start your free trial and explore our platform"
							to="#">
							Free Trial
						</Link>
					</li>
				</ul>
			</div>
		</StyledFooter>
	);
}

export default Footer;
