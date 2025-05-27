import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { SignInData } from "../App";

import { IoClose } from "react-icons/io5";
import { IoCart } from "react-icons/io5";

import Modal from "react-modal";
import Hamburger from "hamburger-react";

import {
	StyledHeader,
	StyledNavContainer,
	StyledLogo,
	StyledHamburgerWrapper,
	StyledNavLinks,
	StyledPrimaryDarkButton,
	StyledButtonWrapper
} from "./styles/Navbar.styled";

import {
	StyledModalContent,
	// StyledOverlay,
	StyledIconWrapper,
	StyledErrorMessage,
	StyledLoginErrorMessage
} from "./styles/Modal.styled";

import { StyledOverlay } from "./styles/ModalOverlay.styled";

Modal.setAppElement("#root");

interface DecodedToken {
	exp: number;
}

function Navbar() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const [userId, setUserId] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	function isTokenValid(token: string): boolean {
		try {
			const decoded = jwtDecode<DecodedToken>(token);

			const currentTime = Date.now() / 1000;
			return decoded.exp > currentTime;
		} catch (error) {
			console.error("Token decoded failed:", error);
			return false;
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (token && isTokenValid(token)) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	function openModal() {
		setIsModalOpen(true);
		setIsOpen(false);
	}

	function closeModal() {
		setIsModalOpen(false);

		setEmail("");
		setPassword("");
		setEmailError(false);
		setPasswordError(false);
		setLoginError(false);
	}

	function toggleLoginStatus() {
		if (isLoggedIn) {
			setIsLoggedIn(false);
			setIsOpen(false);
			localStorage.removeItem("authToken");
			navigate("/");
		} else {
			openModal();
		}
	}

	// SIGN IN FUNCTION
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!email) {
			setEmailError(true);

			setTimeout(() => {
				setEmailError(false);
			}, 3000);
		}

		if (!password) {
			setPasswordError(true);

			setTimeout(() => {
				setPasswordError(false);
			}, 3000);
		}

		const loginData = {
			email,
			password
		};

		fetch("/api/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(loginData)
		}).then((response) =>
			response
				.json()
				.then((data: SignInData) => {
					if (response.status === 200) {
						localStorage.setItem("authToken", data.token);
						localStorage.setItem("userId", data.user.user_id.toString());
						setIsLoggedIn(isTokenValid(data.token));

						setUserId(data.user.user_id);

						navigate(`/dashboard/${data.user.user_id}`);

						setEmail("");
						setPassword("");
						setIsModalOpen(false);
					} else if (response.status === 401) {
						setLoginError(true);

						setTimeout(() => {
							setLoginError(false);
						}, 3000);

						setEmail("");
						setPassword("");
					}
				})
				.catch((error: unknown) =>
					console.log("Something went wrong. Please try again later.", error)
				)
		);
	}

	return (
		<>
			<StyledHeader>
				<StyledNavContainer>
					<StyledLogo>
						<Link
							aria-label="Return to DevAcademy homepage"
							onClick={() => setIsOpen(false)}
							to="/">
							DevAcademy
						</Link>
					</StyledLogo>

					<StyledHamburgerWrapper>
						<Hamburger
							aria-expanded={isOpen}
							aria-label={
								isOpen ? "Close navigation menu" : "Open navigation menu"
							}
							toggled={isOpen}
							toggle={setIsOpen}
						/>
					</StyledHamburgerWrapper>

					<StyledNavLinks $isOpen={isOpen}>
						<Link
							aria-label="Navigate to the homepage"
							onClick={() => setIsOpen(false)}
							to="/">
							Home
						</Link>
						<Link
							aria-label="Browse all available courses"
							onClick={() => setIsOpen(false)}
							to="/all-courses">
							Courses
						</Link>
						<Link
							aria-label="View all course instructors"
							onClick={() => setIsOpen(false)}
							to="/instructors">
							Instructors
						</Link>
						<Link
							aria-label="View your dashboard"
							onClick={() => setIsOpen(false)}
							to={`/dashboard/${userId}`}>
							Dashboard
						</Link>

						<StyledButtonWrapper>
							<StyledPrimaryDarkButton
								onClick={toggleLoginStatus}
								aria-label={
									isLoggedIn
										? "Sign out from your account"
										: "Sign in to your account"
								}>
								{isLoggedIn ? "Sign Out" : "Sign In"}
							</StyledPrimaryDarkButton>

							<Link
								aria-label="View your shopping cart"
								to="/cart"
								onClick={() => setIsOpen(false)}>
								<IoCart />
								Cart
							</Link>
						</StyledButtonWrapper>
					</StyledNavLinks>
				</StyledNavContainer>
			</StyledHeader>

			{/* Modal */}
			<Modal
				className="modal-content"
				style={StyledOverlay}
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Sign in modal">
				<StyledModalContent>
					<StyledIconWrapper aria-label="Close modal" onClick={closeModal}>
						<IoClose />
						<span>Close</span>
					</StyledIconWrapper>
					<h2>Welcome to DevAcademy</h2>
					<p className="login-details">
						Please enter your details to log into your account
					</p>
					<form onSubmit={handleSubmit}>
						<label htmlFor="signin-email">Email</label>
						<input
							id="signin-email"
							onChange={(event) => {
								setEmail(event.target.value);
								setEmailError(false);
								setLoginError(false);
							}}
							placeholder="Enter your email"
							type="text"
							value={email}
						/>
						{emailError && (
							<StyledErrorMessage>
								Please provide a valid email address.
							</StyledErrorMessage>
						)}

						<label htmlFor="signin-password">Password</label>
						<input
							id="signin-password"
							onChange={(event) => {
								setPassword(event.target.value);
								setPasswordError(false);
								setLoginError(false);
							}}
							placeholder="Enter your password"
							type="password"
							value={password}
						/>
						{passwordError && (
							<StyledErrorMessage>
								Please provide your password.
							</StyledErrorMessage>
						)}

						<input
							aria-label="Sign in to your DavAcademy account"
							type="submit"
							value="Sign In"
						/>

						{loginError && (
							<StyledLoginErrorMessage>
								Login failed. Please check your email and password.
							</StyledLoginErrorMessage>
						)}
					</form>
					<div>
						<p>Don't hava an account?</p>
						<Link
							aria-label="Create an account"
							onClick={closeModal}
							to="/sign-up">
							Sign Up
						</Link>
					</div>
				</StyledModalContent>
			</Modal>
		</>
	);
}

export default Navbar;
