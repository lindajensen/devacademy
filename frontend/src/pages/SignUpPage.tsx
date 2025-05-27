import { useState } from "react";

import { AiOutlineGlobal } from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";
import { PiChalkboardTeacher } from "react-icons/pi";

import {
	StyledSignUpWrapper,
	StyledFormSection,
	StyledIconWrapper,
	StyledErrorMessage,
	StyledSuccessMessage
} from "../components/styles/SignUpPage.styled";

interface NewUser {
	name: string;
	email: string;
	password: string;
}

function SignUpPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailExists, setEmailExists] = useState(false);
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [accountCreated, setAccountCreated] = useState(false);

	// SIGN UP
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!name) {
			setNameError(true);

			setTimeout(() => {
				setNameError(false);
			}, 3000);

			return;
		}

		if (!email) {
			setEmailError(true);

			setTimeout(() => {
				setEmailError(false);
			}, 3000);

			return;
		}

		if (!password) {
			setPasswordError(true);

			setTimeout(() => {
				setPasswordError(false);
			}, 3000);

			return;
		}

		const newUser: NewUser = {
			name,
			email,
			password
		};

		fetch("/api/signup", {
			body: JSON.stringify(newUser),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		})
			.then((response) => {
				response.json();

				if (response.status === 409) {
					setEmailExists(true);

					setTimeout(() => {
						setEmailExists(false);
					}, 3000);
				}

				if (response.status === 201) {
					setAccountCreated(true);

					setTimeout(() => {
						setAccountCreated(false);
					}, 3000);

					setName("");
					setEmail("");
					setPassword("");
				}
			})
			.catch((error) =>
				console.log("Unable to create account. Please try again later.", error)
			);
	}

	return (
		<StyledSignUpWrapper>
			<section>
				<h1>Level up your skills. One course at a time.</h1>
				<div>
					<div>
						<StyledIconWrapper>
							<PiChalkboardTeacher />
							<h2>Courses led by experts</h2>
						</StyledIconWrapper>
						<p>
							Learn from industry professionals with real-world experience and
							practical knowledge.
						</p>
					</div>

					<div>
						<StyledIconWrapper>
							<LuAlarmClock />
							<h2> Learn at your own pace</h2>
						</StyledIconWrapper>

						<p>
							Access courses anytime, anywhere. Pause and resume when it suits
							you best.
						</p>
					</div>

					<div>
						<StyledIconWrapper>
							<AiOutlineGlobal />
							<h2> Join a global community</h2>
						</StyledIconWrapper>
						<p>
							Connect with learners and instructors from around the world in a
							supportive environment.
						</p>
					</div>
				</div>
			</section>

			<StyledFormSection>
				<div>
					<h2>Get started with DevAcademy</h2>
					<form onSubmit={handleSubmit}>
						<label htmlFor="name">Full name</label>
						<input
							id="name"
							onChange={(event) => setName(event.target.value)}
							placeholder="Enter your first and last name"
							type="text"
							value={name}
						/>
						{nameError && (
							<StyledErrorMessage>
								Please enter your full name
							</StyledErrorMessage>
						)}

						<label htmlFor="email">Email</label>
						<input
							id="email"
							onChange={(event) => {
								setEmail(event.target.value);
								setEmailExists(false);
							}}
							placeholder="Enter your email"
							type="text"
							value={email}
						/>
						{emailError && (
							<StyledErrorMessage>Please enter your email</StyledErrorMessage>
						)}
						{emailExists && (
							<StyledErrorMessage>
								This email is already registered. please try another one.
							</StyledErrorMessage>
						)}

						<label htmlFor="password">Password</label>
						<input
							id="password"
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Enter your password"
							type="password"
							value={password}
						/>
						{passwordError && (
							<StyledErrorMessage>Please a valid password</StyledErrorMessage>
						)}

						<input
							aria-label="Create DevAcademy account"
							type="submit"
							value="Create Account"
						/>

						{accountCreated && (
							<StyledSuccessMessage>
								Account successfully created
							</StyledSuccessMessage>
						)}
					</form>
				</div>
			</StyledFormSection>
		</StyledSignUpWrapper>
	);
}

export default SignUpPage;
