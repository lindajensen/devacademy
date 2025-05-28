import { GlobalStyles } from "./components/styles/Global";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import AllCoursesPage from "./pages/AllCoursesPage";
import InstructorsPage from "./pages/InstructorsPage";
import InstructorDetailsPage from "./pages/InstructorDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import CertificatePage from "./pages/CertificatePage";
import CartPage from "./pages/CartPage";
import CertificateLayout from "./layouts/CertificateLayout";

// INTERFACES ------------------------------------------------------------------
export interface Course {
	course_id: number;
	course_name: string;
	course_description: string;
	price: number;
	category: string;
	thumbnail: string;
	instructor_id: number;
}

export interface CourseIncludingInstructorAndRating extends Course {
	instructor_id: number;
	instructor_name: string;
	average_rating: number;
}

export interface CourseIncludingCompletedAndCompletedAt extends Course {
	completed: boolean;
	completed_at: string;
}

export interface Instructor {
	instructor_id: number;
	name: string;
	bio: string;
	quote: string;
	profile_picture: string;
	rating: number;
	linkedin: string;
	focus_area: string;
	tags: string;
}

export interface Review {
	review_id: number;
	course_id: number;
	user_id: number;
	rating: number;
	comment: string;
	created_at: string;
}

export interface ReviewIncludingUsername extends Review {
	user_name: string;
}

export interface User {
	user_id: number;
	name: string;
	email: string;
	password: string;
	role: string;
	avatar: string;
}

// TYPES ------------------------------------------------------------------
export type DashboardData = {
	user: User;
	courses: CourseIncludingCompletedAndCompletedAt[];
};

export type SignInData = {
	user: User;
	token: string;
};

// ROUTER ----------------------------------------------------------------------
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* Main layout with navbar and footer */}
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="all-courses" element={<AllCoursesPage />} />
				<Route path="/courses/:course_id" element={<CourseDetailsPage />} />
				<Route path="instructors" element={<InstructorsPage />} />
				<Route path="instructors/:id" element={<InstructorDetailsPage />} />
				<Route path="sign-up" element={<SignUpPage />} />
				<Route path="dashboard/:id" element={<DashboardPage />} />
				<Route path="cart" element={<CartPage />} />
			</Route>

			{/* Certificate layout without navbar and footer */}
			<Route element={<CertificateLayout />}>
				<Route path="certificate/:course_id" element={<CertificatePage />} />
			</Route>
		</>
	)
);

function App() {
	return (
		<>
			<GlobalStyles />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
