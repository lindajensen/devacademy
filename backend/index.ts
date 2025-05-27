import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Client } from "pg";
import path from "path";

dotenv.config();

const app = express();

// MIDDLEWARE ------------------------------------------------------------------
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "dist")));

function verifyToken(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	const token = request.headers["authorization"]?.split(" ")[1];

	if (!token) {
		response.status(401).send({ message: "Missing token" });
	} else {
		jwt.verify(token, "mySecretKey", (error, decoded) => {
			if (error || !decoded) {
				return response
					.status(401)
					.send({ message: "Invalid or expired token" });
			}

			request.user = decoded as MyUser;
			next();
		});
	}
}

const client = new Client({
	connectionString: process.env.PGURI
});

client.connect();

// INTERFACES ------------------------------------------------------------------
interface Course {
	course_id: number;
	course_name: string;
	course_description: string;
	price: number;
	category: string;
	thumbnail: string;
	instructor_id: number;
}

interface CourseIncludingAverageRating extends Course {
	instructor_id: number;
	average_rating: number;
}

interface CourseIncludingCompletedAndCompletedAt extends Course {
	completed: boolean;
	completed_at: string;
}

interface Instructor {
	instructor_id: number;
	name: string;
	bio: string;
	profile_picture: string;
	rating: number;
	linkedin: string;
	focus_area: string;
	tags: string;
}

interface Review {
	review_id: number;
	course_id: number;
	user_id: number;
	rating: number;
	comment: string;
	created_at: string;
}

interface User {
	user_id: number;
	name: string;
	email: string;
	password: string;
	avatar: string;
	role: string;
}

interface MyUser {
	user: string;
	user_id: number;
}

declare global {
	namespace Express {
		interface Request {
			user: MyUser;
		}
	}
}

// TYPES -----------------------------------------------------------------------
type UserEmail = Pick<User, "email">;
type UserPassword = Pick<User, "password">;

// ROUTES ----------------------------------------------------------------------

// GET popular Courses (/landingpage)
app.get("/api/landing-page", async (request: Request, response: Response) => {
	try {
		const result = await client.query<CourseIncludingAverageRating>(
			`SELECT
        c.course_id,
        c.course_name,
        c.course_description,
        c.price,
        c.category,
        c.thumbnail,
        u.user_id AS instructor_id,
        u.name AS instructor_name,
        AVG(r.rating) AS average_rating
      FROM courses c
      JOIN users u ON c.instructor_id = u.user_id
      LEFT JOIN reviews r ON c.course_id = r.course_id
      GROUP BY
        c.course_id,
        c.course_name,
        c.course_description,
        c.price,
        c.category,
        c.thumbnail,
        u.user_id,
        u.name;
      `
		);

		const popularCourses = result.rows;

		response.status(200).send(popularCourses);
	} catch (error) {
		console.log("Error fetching courses:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// GET all Courses
app.get("/api/courses", async (request: Request, response: Response) => {
	try {
		const result = await client.query<CourseIncludingAverageRating>(`
    SELECT
      c.course_id,
      c.course_name,
      c.course_description,
      c.price,
      c.category,
      c.thumbnail,
      u.user_id AS instructor_id,
      u.name AS instructor_name,
      AVG(r.rating) AS average_rating
    FROM courses c
    JOIN users u ON c.instructor_id = u.user_id
    LEFT JOIN reviews r ON c.course_id = r.course_id
    GROUP BY
      c.course_id,
      c.course_name,
      c.course_description,
      c.price,
      c.category,
      c.thumbnail,
      u.user_id,
      u.name
    `);

		const allCourses = result.rows;

		response.status(200).send(allCourses);
	} catch (error) {
		console.log("Error fetching courses:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// GET specific course
app.get("/api/courses/:id", async (request: Request, response: Response) => {
	try {
		const result = await client.query<CourseIncludingAverageRating>(
			`
    SELECT
      c.course_id,
      c.course_name,
      c.course_description,
      c.price,
      c.category,
      c.thumbnail,
      u.user_id AS instructor_id,
      u.name AS instructor_name,
      AVG(r.rating) AS average_rating
    FROM courses c
    JOIN users u ON c.instructor_id = u.user_id
    LEFT JOIN reviews r ON c.course_id = r.course_id
    WHERE c.course_id = $1
    GROUP BY
      c.course_id,
      c.course_name,
      c.course_description,
      c.price,
      c.category,
      c.thumbnail,
      u.user_id,
      u.name
    `,
			[request.params.id]
		);

		const course = result.rows[0];

		if (result.rows.length === 0) {
			response.status(404).send({ message: "Course not found" });
			return;
		} else {
			response.status(200).send(course);
		}
	} catch (error) {
		console.log("Error fetching course:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// GET All instructors
app.get("/api/instructors", async (request: Request, response: Response) => {
	try {
		const result = await client.query<Instructor>(`
    SELECT *
    FROM instructors
    `);

		const allInstructors = result.rows;

		response.status(200).send(allInstructors);
	} catch (error) {
		console.log("Error fetching instructors:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// GET specific instructor
app.get(
	"/api/instructors/:id",
	async (request: Request, response: Response) => {
		try {
			const result = await client.query<Instructor>(
				`
    SELECT *
    FROM instructors
    WHERE instructor_id = $1
    `,
				[request.params.id]
			);

			const instructor = result.rows[0];

			if (result.rows.length === 0) {
				response.status(404).send({ message: "Instructor not found" });
			} else {
				response.status(200).send(instructor);
			}
		} catch (error) {
			console.log("Error fetching instructor:", error);
			response.status(500).send({ message: "Something went wrong" });
		}
	}
);

// GET specific reviews
app.get("/api/reviews/:id", async (request: Request, response: Response) => {
	try {
		const result = await client.query<Review>(
			`
    SELECT *
    FROM reviews
    WHERE course_id = $1
    `,
			[request.params.id]
		);

		const review = result.rows;

		response.status(200).send(review);
	} catch (error) {
		console.log("Error fetching reviews:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// GET specific user page
app.get(
	"/api/dashboard/:id",
	verifyToken,
	async (request: Request, response: Response) => {
		try {
			if (request.user.user_id !== Number(request.params.id)) {
				response.status(403).send({ error: "Access denied" });
				return;
			}

			const userResult = await client.query<User>(
				`
      SELECT *
      FROM users
      WHERE user_id = $1
      `,
				[request.params.id]
			);

			const user = userResult.rows[0];

			if (!user) {
				response.status(404).send({ error: "User not found" });
			}

			const courseResult =
				await client.query<CourseIncludingCompletedAndCompletedAt>(
					`
        SELECT
          courses.*,
          user_courses.completed,
          user_courses.completed_at
        FROM user_courses
        JOIN courses ON user_courses.course_id = courses.course_id
        WHERE user_courses.user_id = $1
        `,
					[request.params.id]
				);

			const courses = courseResult.rows;

			response.status(200).send({
				user,
				courses
			});
		} catch (error) {
			console.log("Error in fetching user:", error);
			response.status(500).send({ error: "Something went wrong" });
		}
	}
);

// Create new user account (POST)
app.post("/api/signup", async (request: Request, response: Response) => {
	try {
		const checkUser = await client.query<UserEmail>(
			"SELECT * FROM users WHERE email = $1",
			[request.body.email]
		);

		const existingUser = checkUser.rows[0];

		if (existingUser) {
			response.status(409).send({ message: "Email address already exists" });
			return;
		}

		await client.query(
			`
      INSERT INTO users (
        name,
        email,
        password
      ) VALUES ($1, $2, $3)
      `,
			[request.body.name, request.body.email, request.body.password]
		);
		response.status(201).send({ message: "Account created" });
	} catch (error) {
		console.error("Error creating user:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// POST review
app.post("/api/reviews", async (request: Request, response: Response) => {
	try {
		const result = await client.query<Review>(
			`
    SELECT *
    FROM reviews
    WHERE course_id = $1
    AND user_id = $2
    `,
			[request.body.course_id, request.body.user_id]
		);

		if (request.body.rating < 1) {
			response.status(400).send({ message: "Rating must be between 1 and 5" });
		}

		const review = result.rows[0];

		if (review) {
			response
				.status(409)
				.send({ message: "You've already submitted a review for this course" });
		}

		await client.query(
			`
      INSERT INTO reviews (course_id, user_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      `,
			[
				request.body.course_id,
				request.body.user_id,
				request.body.rating,
				request.body.comment
			]
		);
		response.status(201).send({ message: "Review submitted" });
	} catch (error) {
		console.error("Error posting review:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// Sign in (POST)
app.post("/api/signin", async (request: Request, response: Response) => {
	try {
		const result = await client.query<User>(
			`
      SELECT *
      FROM users
      WHERE email = $1
      AND password = $2
    `,
			[request.body.email, request.body.password]
		);

		const user = result.rows[0];

		if (user) {
			const token = jwt.sign(
				{ user_id: user.user_id, email: user.email, password: user.password },
				"mySecretKey",
				{ expiresIn: "1h" }
			);

			response.status(200).json({
				message: "Login successful",
				token: token,
				user: {
					user_id: user.user_id,
					name: user.name,
					email: user.email,
					role: user.role,
					avatar: user.avatar
				}
			});
		} else {
			response
				.status(401)
				.send({ message: "Invalid email or password. Please try again." });
		}
	} catch (error) {
		console.error("Error signing in:", error);
		response.status(500).send({ message: "Something went wrong" });
	}
});

// Change email (PATCH)
app.patch(
	"/api/account/email",
	verifyToken,
	async (request: Request, response: Response) => {
		try {
			const userId = request.user.user_id;

			if (!request.body.email) {
				response.status(400).send({ message: "You must provide an email" });
				return;
			}

			const existingEmail = await client.query<UserEmail>(
				`SELECT email FROM users WHERE email = $1`,
				[request.body.email]
			);

			if (existingEmail.rows.length > 0) {
				response.status(409).send({ message: "That email is already taken" });
				return;
			}

			await client.query<UserEmail>(
				`
        UPDATE users
        SET email = $1
        WHERE user_id = $2
      `,
				[request.body.email, userId]
			);

			response.status(200).send({ message: "Email updated" });
		} catch (error) {
			console.error("Error updating email:", error);
			response.status(500).send({ message: "Something went wrong" });
		}
	}
);

// Change password (PATCH)
app.patch(
	"/api/account/password",
	verifyToken,
	async (request: Request, response: Response) => {
		try {
			const userId = request.user.user_id;

			await client.query<UserPassword>(
				`
      UPDATE users
      SET password = $1
      WHERE user_id = $2
      `,
				[request.body.password, userId]
			);
			response.status(200).send({ message: "Password updated" });
		} catch (error) {
			console.error("Error updating password:", error);
			response.status(500).send({ message: "Something went wrong" });
		}
	}
);

// DELETE Account
app.delete(
	"/api/account",
	verifyToken,
	async (request: Request, response: Response) => {
		try {
			const userId = request.user.user_id;

			await client.query(
				`
      DELETE
      FROM user_courses
      WHERE user_id = $1
      `,
				[userId]
			);

			await client.query(
				`
        DELETE
        FROM reviews
        WHERE user_id = $1
      `,
				[userId]
			);

			await client.query(
				`
        DELETE
        FROM users
        WHERE user_id = $1
      `,
				[userId]
			);

			response.status(200).send("Account deleted");
		} catch (error) {
			console.log("Error deleting account:", error);
			response.status(500).send({ message: "Something went wrong" });
		}
	}
);

app.get("*", (request, response) => {
	response.sendFile(path.join(path.resolve(), "dist/index.html"));
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
