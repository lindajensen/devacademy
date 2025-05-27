import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import html2pdf from "html2pdf.js";

import { DashboardData } from "../App";
import { User, CourseIncludingCompletedAndCompletedAt } from "../App";

import {
	StyledCertificateSection,
	StyledCertificateContent,
	StyledSignature,
	StyledCoreTopics,
	StyledFallbackMessage
} from "../components/styles/CertificatePage.styled";

function CertificatePage() {
	const { course_id } = useParams();
	const [searchParams] = useSearchParams();
	const autoDownload = searchParams.get("autodownload") === "true";
	const [user, setUser] = useState<User | null>(null);
	const [course, setCourse] =
		useState<CourseIncludingCompletedAndCompletedAt | null>(null);
	const [hasDownloaded, setHasDownloaded] = useState(false);

	const certificateRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	// FETCH COMPLETED COURSES
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const id = localStorage.getItem("userId");

		fetch(`/api/dashboard/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => {
				if (response.status === 403) {
					console.log("Access denied. Token invalid or user mismatch");
					return null;
				}
				return response.json();
			})
			.then((data: DashboardData) => {
				const selectedCourse = data.courses.find(
					(course) => course.course_id === Number(course_id)
				);

				setCourse(selectedCourse || null);
				setUser(data.user);
			})
			.catch((error: unknown) =>
				console.log("Error fetching certificate data:", error)
			);
	}, [course_id]);

	// DOWNLOAD CERTIFICATE
	useEffect(() => {
		if (
			autoDownload &&
			course &&
			user &&
			certificateRef.current &&
			!hasDownloaded
		) {
			setHasDownloaded(true);

			html2pdf()
				.from(certificateRef.current)
				.set({
					margin: 1,
					filename: "devacademy_certificate.pdf",
					image: { type: "jpeg", quality: 0.98 },
					html2canvas: { scale: 2 },
					jsPDF: { unit: "in", format: "a4", orientation: "landscape" }
				})
				.save()
				.then(() => {
					navigate(`/dashboard/${user.user_id}`);
				});
		}
	}, [autoDownload, course, user, hasDownloaded, navigate]);

	return (
		<StyledCertificateSection ref={certificateRef}>
			<h1>DevAcademy</h1>

			<StyledCertificateContent>
				{course && user ? (
					<>
						<h2>{course.course_name}</h2>
						<p>Course completed by {user.name}</p>
						<p>
							{new Date(course.completed_at).toLocaleDateString("en-GB", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric"
							})}
						</p>

						<h4>Core Topics Covered</h4>
						<StyledCoreTopics>
							{course.category.split(",").map((category, index) => (
								<span key={index}>{category}</span>
							))}
						</StyledCoreTopics>
						<StyledSignature>Victoria Taylor</StyledSignature>
						<small>Lead Instructor, DevAcademy</small>
					</>
				) : (
					<StyledFallbackMessage>
						Certificate data not available. Please make sure you are logged in
						and have completed the course.
					</StyledFallbackMessage>
				)}
			</StyledCertificateContent>
		</StyledCertificateSection>
	);
}

export default CertificatePage;
