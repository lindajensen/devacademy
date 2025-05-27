DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS user_courses CASCADE;
DROP TABLE IF EXISTS instructors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  avatar TEXT DEFAULT 'generic-avatar.png',
  role TEXT NOT NULL DEFAULT 'Student',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE instructors (
  instructor_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  quote TEXT NOT NULL,
  profile_picture TEXT,
  rating REAL,
  linkedin TEXT,
  focus_area TEXT NOT NULL,
  tags TEXT NOT NULL,
  FOREIGN KEY (instructor_id) REFERENCES users(user_id)
);

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY ,
  course_name TEXT NOT NULL,
  course_description TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  thumbnail TEXT,
  instructor_id INTEGER NOT NULL,
  FOREIGN KEY (instructor_id) REFERENCES users(user_id)
);

CREATE TABLE user_courses (
  user_id INTEGER,
  course_id INTEGER,
  completed BOOLEAN,
  completed_at TEXT,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- USERS TABLE
INSERT INTO users (name, email, password, avatar, role) VALUES
('Anna Johnson', 'anna.johnson@mail.com', 'annaspassword123', 'anna-johnson.webp', 'Student'),
('Eric Smith', 'eric.smith@mail.com', 'ericspassword123', 'eric-smith.webp', 'Student'),
('Lisa Williams', 'lisa.williams@mail.com', 'lisaspassword123', 'lisa-williams.webp', 'Student'),
('John Brown', 'john.brown@mail.com', 'johnspassword123', 'john-brown.webp', 'Student'),
('Sarah Lee', 'sarah.lee@mail.com', 'sarahspassword123', 'sarah-lee.webp', 'Student'),

('Victoria Taylor', 'victoria.taylor@devacademy.com', 'victoriaspassword123', 'victoria-taylor.webp', 'Instructor'),
('Benjamin Scott', 'benjamin.scott@devacademy.com', 'benjaminspassword123', 'benjamin-scott.webp', 'Instructor'),
('Isabella Clark', 'isabella.clark@devacademy.com', 'isabellaspassword123', 'isabella-clark.webp', 'Instructor'),
('Daniel Martinez', 'daniel.martinez@devacademy.com', 'danielspassword123', 'daniel-martinez.webp', 'Instructor'),
('Sophia Lewis', 'sophia.lewis@devacademy.com', 'sophiaspassword123', 'sophia-lewis.webp', 'Instructor'),
('Michael Robinson','michael.robinson@devacademy.com', 'michaelspassword123', 'michael-robinson.webp', 'Instructor'),

('Samuel Harris', 'samuel.harris@devacademy.com', 'samuelspassword123', 'samuel-harris.webp', 'Admin'),
('Eleanor Wright', 'eleanor.wright@devacademy.com', 'eleanorspassword123', 'eleanor-wright.webp', 'Admin');

-- INSTRUCTORS TABLE
INSERT INTO instructors (instructor_id, name, bio, quote, profile_picture, rating, linkedin, focus_area, tags) VALUES
(6, 'Victoria Taylor', 'I''m Victoria, a passionate frontend developer with over 8 years of experience in web development and teaching. My journey into coding began when I built my first website at the age of 14. Since then, I''ve developed over 200 websites and applications. I''ve taught web development to thousands of students, from complete beginners to experienced developers looking to sharpen their skills.

I specialize in modern web technologies like React, JavaScript, HTML, and CSS, and I believe in making learning interactive and engaging. I''m one of the founders of DevAcademy, where I''ve created a variety of bootcamps and online courses. I''m also a frequent speaker at conferences and have collaborated with tech companies such as Facebook and Microsoft to help their teams stay ahead of the latest web trends.

When I''m not teaching, I''m either coding personal projects, contributing to open-source, or playing around with new JavaScript libraries. My goal is to help students not only understand coding but truly enjoy the process. In my courses, you''ll get a hands-on approach with plenty of projects and challenges to push your learning further. I''m here to support you every step of the way!', 'Teaching isn''t just about writing code; it''s about helping others unlock their creativity. I love watching students go from hesitant to confident, building things they never thought possible.', 'victoria-taylor.webp', 4.8, 'https://linkedin.com', 'Frontend Development', 'HTML CSS JavaScript'),

(7, 'Benjamin Scott', 'Hi, I''m Benjamin, a backend developer with a love for teaching the intricacies of server-side programming. I''ve spent the last 10 years building scalable, efficient applications and teaching backend technologies like Node.js, SQL, and Python. Over the years, I''ve worked with top-tier companies such as Amazon, Spotify, and Airbnb to create the backbone of their web systems.

My teaching philosophy is simple: make complex concepts approachable. I break down complicated backend topics into digestible, bite-sized lessons, and I love to incorporate real-world examples into my courses to help you understand the practical applications of what you''re learning. In addition to teaching at the "Backend Masters Bootcamp", I have also worked as a freelance consultant for tech startups.

When I''m not coding or teaching, you''ll find me experimenting with machine learning or cooking up something new in the kitchen. I''m here to guide you as you master backend development and build your skills for a successful career.', 'There''s nothing better than seeing a student suddenly get it. That moment of clarity is why I teach; to break complex ideas down and build others up.', 'benjamin-scott.webp', 3.8, 'https://linkedin.com', 'Backend Development', 'Node.js SQL Python'),

(8, 'Isabella Clark', 'Hi, I''m Isabella, a full-stack developer with a passion for teaching. I''ve been developing applications for over 12 years and have worked with a wide range of technologies from PHP to React to AWS. I''ve been the lead instructor at DevAcademy for the last 5 years, where I''ve taught hundreds of students to become full-stack developers.

What excites me about teaching is helping students bridge the gap between frontend and backend technologies, and I specialize in giving learners the skills they need to become true full-stack developers. My courses are designed to provide a comprehensive understanding of both frontend and backend technologies so you can build complete, production-ready applications.

In my free time, I love contributing to open-source projects and experimenting with new tools and technologies. I also enjoy mentoring students and helping them land their first tech job. My goal is to provide you with everything you need to succeed, both in my courses and in your career.', 'I teach to help students see how the frontend and backend connect and to show that fullstack is possible, even for beginners. Watching that confidence grow is the best part.', 'isabella-clark.webp', 4.9, 'https://linkedin.com', 'Fullstack Development', 'PHP React AWS'),

(9, 'Daniel Martinez', 'Hello, I''m Daniel, a mobile app developer with a special love for creating beautiful, intuitive apps. I''ve been developing for iOS and Android for over 7 years, building apps that people love to use. I''m the lead instructor at "Mobile Dev Bootcamp", where I teach students how to create powerful mobile applications using Swift, Kotlin, and Flutter.

My teaching approach is all about simplicity. I break down the app development process into manageable chunks, so even beginners can feel confident in building their own apps. I''ve worked with companies like Uber, Airbnb, and Instagram, helping them optimize their mobile apps for performance and user experience.

When I''m not coding, I''m usually experimenting with the latest app development frameworks or exploring new mobile technologies. I''m here to make sure you learn everything you need to become a top-notch mobile developer!', 'Mobile development should feel approachable. I love guiding students from zero to building real, working apps they''re proud to share. That''s where the magic happens.', 'daniel-martinez.webp', 4.6, 'https://linkedin.com', 'Mobile Development', 'Swift Flutter App-Design'),

(10, 'Sophia Lewis', 'Hey there, I''m Sophia, an AI and machine learning expert with over 9 years of experience building intelligent systems. I''ve worked with companies like Google, IBM, and Tesla, helping them integrate AI into their products. I''m passionate about making AI accessible to everyone, which is why I''ve created a series of online courses aimed at teaching the fundamentals of machine learning in a simple, hands-on way.

AI is transforming every industry, and I''m excited to teach you the skills you need to succeed in this fast-growing field. My courses cover everything from data science to deep learning to neural networks, and I''m dedicated to making these concepts approachable for students at all levels.

Outside of teaching, I love solving complex problems, researching the latest AI advancements, and contributing to AI ethics discussions. My courses are filled with projects and challenges to help you apply what you learn, and I''ll be with you every step of the way to guide you on your AI journey.', 'AI is powerful, but it doesn''t have to be intimidating. I teach to help students see that they can shape the future with clarity, curiosity, and a bit of code.', 'sophia-lewis.webp', 3.2, 'https://linkedin.com', 'Artificial Intelligence', 'AI Machine-Learning'),

(11, 'Michael Robinson', 'Hi, I''m Michael, a cybersecurity expert with over a decade of experience helping organizations protect their digital assets. I''m the lead cybersecurity instructor at DevAcademy, where I teach students how to safeguard networks and defend against cyber threats. I''ve worked with global companies such as Cisco, Symantec, and Intel to improve their security infrastructure.

My passion for cybersecurity started when I was a teenager, and I''ve been dedicated to staying ahead of the curve ever since. My courses focus on ethical hacking, penetration testing, and secure coding practices. I''m committed to making cybersecurity not only accessible but fun and engaging for everyone.

When I''m not teaching, I''m conducting security audits for tech companies, researching the latest in cryptography, or traveling to speak at cybersecurity conferences. I''m here to make sure you''re fully equipped to defend the web!', 'Cybersecurity is about empowering people. I teach to give students the tools to protect what matters, and to spark the curiosity that keeps them asking "what if?"', 'michael-robinson.webp', 4.7, 'https://linkedin.com', 'Cybersecurity', 'Python JavaScript Ruby');

-- COURSES TABLE
INSERT INTO courses (course_name, course_description, price, category, thumbnail, instructor_id) VALUES
-- Victoria
('Mastering HTML and CSS', 'This course is your perfect introduction to web development, focusing on the core technologies of the web: HTML and CSS. We''ll start with the basics, including structuring web pages with HTML and styling them with CSS. As we progress, you''ll learn how to create responsive, mobile-friendly designs and master advanced CSS concepts like Flexbox, Grid, animations, and transitions. By the end of the course, you''ll have the skills to build visually appealing, responsive websites from scratch.', 99.99, 'Frontend Development, Responsive Design, HTML & CSS, Web Development', 'mastering-html-and-css.webp', 6),

('Mastering React.js', 'Learn the fundamentals of React.js, the popular JavaScript library used to build dynamic user interfaces. This course covers everything from components, state, and props to advanced concepts like hooks, context, and routing. By the end of this course, you''ll be able to build powerful web applications using React and understand how to use its ecosystem effectively.', 99.99, 'Frontend Development, Javascript Frameworks, React', 'mastering-react.webp', 6),

('Advanced JavaScript Programming', 'Take your JavaScript skills to the next level in this course! We''ll dive deep into asynchronous programming, closures, prototypal inheritance, and design patterns. Perfect for developers who are already comfortable with basic JavaScript and want to master advanced topics to build complex applications.', 99.99, 'Frontend Development, Javascript, Advanced Programming', 'advanced-javascript-programming.webp', 6),

('Web Development Bootcamp', 'A comprehensive web development course that covers HTML, CSS, JavaScript, and popular frameworks. This bootcamp-style course is designed to teach you how to build full-stack web applications with hands-on practice and real-world projects.', 149.99, 'Fullstack Development, Web Development, Coding Bootcamp', 'web-development-bootcamp.webp', 6),

-- Benjamin
('Building Scalable Web Applications with Node.js', 'In this course, you''ll learn how to build powerful and scalable backend applications using Node.js. We''ll cover the essentials of Node.js, including how to set up a server, handle HTTP requests, and work with databases using MongoDB. You''ll also learn how to implement RESTful APIs, handle user authentication, and deploy your applications to the cloud. By the end of this course, you''ll have the skills to create fast and scalable backend systems using JavaScript.', 119.99, 'Backend Development, Node.js, Javascript Backend', 'building-scalable-web-applications-with-nodejs.webp', 7),

('Introduction to Python Programming', 'Whether you''re a beginner or looking to refresh your knowledge, this course will guide you through the basics of Python programming. We''ll cover everything from variables, loops, and functions to data structures and working with libraries. By the end of this course, you''ll have a solid understanding of Python and be ready to tackle more advanced topics.', 89.99, 'Backend Development, Python, Beginner Friendly', 'introduction-to-python-programming.webp', 7),

('Mastering Data Science with Python','Dive into the world of data science with Python! Learn how to analyze data using libraries like pandas, numpy, and matplotlib. We''ll cover data visualization, statistical analysis, and machine learning to help you become a skilled data scientist.', 149.99, 'Data Science', 'mastering-datascience-with-python.webp', 7),

('Web Scraping with Python','Learn how to extract data from websites using Python. We''ll teach you how to use libraries like BeautifulSoup and Scrapy to scrape data, as well as how to deal with challenges like CAPTCHA and dynamic content. By the end of this course, you''ll have the skills to scrape any site.', 99.99, 'Backend Development, Python, Web Scraping', 'web-scraping-with-python.webp', 7),

-- Isabella
('Fullstack Web Development with Node.js', 'In this course, we''ll dive into building full-stack web applications using Node.js for the backend and React.js for the frontend. You''ll learn how to connect to databases, handle authentication, and deploy your applications. We''ll also cover REST APIs and real-time communication with WebSockets. By the end of this course, you''ll be equipped to build and deploy complete web applications from scratch.', 149.99, 'Fullstack Development, Node.js, React', 'fullstack-web-development-with-nodejs.webp', 8),

('Advanced Node.js Development', 'Take your Node.js skills to the next level with this advanced course. We''ll explore how to build scalable and performant applications using Node.js, including topics like serverless architecture, microservices, and event-driven programming. Learn how to use the latest features and best practices in the Node.js ecosystem.', 129.99, 'Backend Development, Node.js, Advanced Programming', 'advanced-nodejs-development.webp', 8),

('Building APIs with Express.js', 'Learn how to build RESTful APIs with Express.js, a fast and minimalist web framework for Node.js. We''ll cover routing, middleware, error handling, authentication, and more to build robust APIs that integrate with databases and handle requests efficiently.', 109.99, 'Backend Development, Express.js, Web APIs', 'building-apis-with-expressjs.webp', 8),

-- Daniel
('Mobile App Development with Flutter', 'Learn how to build cross-platform mobile applications using Google''s Flutter framework. This course will teach you the essentials of Flutter, including widgets, navigation, state management, and working with APIs. Whether you''re building for iOS or Android, Flutter provides a fast and efficient way to develop mobile apps with a single codebase.', 129.99, 'Mobile Development, Flutter, iOS & Android Development', 'mobile-app-development-with-flutter.webp', 9),

('Flutter for Beginners', 'A beginner-friendly course that will introduce you to mobile app development with Flutter. We''ll cover the basics of building your first mobile app, working with widgets, layouts, and handling user input. By the end of the course, you''ll be able to build simple, responsive apps for both iOS and Android.', 109.99, 'Mobile Development, Flutter, Beginner Friendly', 'flutter-for-beginners.webp', 9),

('Advanced Flutter Development', 'This course is for those who already have a basic understanding of Flutter and want to take their skills to the next level. We''ll dive into more complex topics like state management with Provider, working with Firebase, and integrating custom native code into Flutter apps.', 149.99, 'Mobile Development, Flutter, Advanced Programming', 'advanced-flutter-development.webp', 9),

-- Sophia
('Introduction to Artificial Intelligence', 'AI is revolutionizing industries all over the world, and this course provides an introduction to the fundamentals of artificial intelligence. We''ll cover topics like machine learning, neural networks, natural language processing, and computer vision. This course is designed for beginners and will give you the foundational knowledge to dive deeper into AI concepts.', 149.99, 'Artificial Intelligence, Machine Learning, Beginner Friendly', 'introduction-to-artificial-intelligence.webp', 10),

('Introduction to Machine Learning with Python', 'In this course, you''ll get a hands-on introduction to machine learning using Python. We''ll explore key machine learning algorithms such as linear regression, decision trees, and k-nearest neighbors. You''ll learn how to preprocess data, train models, and evaluate their performance. By the end of this course, you''ll have a solid foundation in machine learning and be able to apply these concepts to real-world problems.', 119.99, 'Artificial Intelligence, Python, Machine Learning', 'introduction-to-machine-learning-with-python.webp', 10),

('Deep Learning for Beginners', 'Ready to dive into deep learning? This course will introduce you to the basics of neural networks and deep learning. We''ll cover concepts like activation functions, backpropagation, and convolutional neural networks (CNNs). You''ll use TensorFlow and Keras to build your first deep learning models. By the end of this course, you''ll understand how deep learning works and be able to start building your own AI systems.', 149.99, 'Artificial Intelligence, Machine Learning, Beginner Friendly', 'deep-learning-for-beginners.webp', 10),

-- Michael
('Cybersecurity Essentials', 'Learn the basics of cybersecurity, from securing networks and protecting data to ethical hacking and incident response. This course provides a comprehensive overview of cybersecurity concepts and practical skills that are essential for anyone entering the field. By the end of this course, you''ll have a foundational understanding of how to safeguard systems and data from potential threats.', 119.99, 'Cybersecurity, Information Security, Data Protection', 'cybersecurity-essentials.webp', 11),

('Ethical Hacking: Penetration Testing Basics', 'Learn the essentials of ethical hacking and penetration testing. This course will take you through common penetration testing techniques, including network scanning, vulnerability assessment, and exploitation. You''ll also learn how to use popular tools like Kali Linux and Metasploit. By the end of the course, you''ll be able to perform basic penetration tests and understand the legal and ethical aspects of hacking.', 109.99, 'Cybersecurity, Ethical Hacking, Penetration Testing', 'ethical-hacking-penetration-testing-basics.webp', 11),

('Secure Coding Practices for Developers', 'In this course, you''ll learn how to write secure code and protect your applications from common security vulnerabilities like SQL injection, cross-site scripting (XSS), and buffer overflows. We''ll cover best practices for secure coding and demonstrate how to implement security in your development workflow. By the end of the course, you''ll be able to write code that is resistant to attacks and ensure your applications are safe and secure.', 99.99, 'Cybersecurity, Secure Coding, Application Security', 'secure-coding-practices-for-developers.webp', 11);

-- USER_COURSES TABLE
INSERT INTO user_courses (user_id, course_id, completed, completed_at) VALUES
-- Anna
(1, 1, true, CURRENT_TIMESTAMP),
(1, 2, true, CURRENT_TIMESTAMP),
(1, 5, false, null),
(1, 17, true, CURRENT_TIMESTAMP),

-- Eric
(2, 4, true, CURRENT_TIMESTAMP),
(2, 6, true, CURRENT_TIMESTAMP),
(2, 14, true, CURRENT_TIMESTAMP),
(2, 20, true, CURRENT_TIMESTAMP),

-- Lisa
(3, 3, true, CURRENT_TIMESTAMP),
(3, 10, false, null),
(3, 15, true, CURRENT_TIMESTAMP),
(3, 19, true, CURRENT_TIMESTAMP),

-- John
(4, 8, true, CURRENT_TIMESTAMP),
(4, 9, true, CURRENT_TIMESTAMP),
(4, 11, true, CURRENT_TIMESTAMP),
(4, 12, false, null),

-- Sarah
(5, 13, true, CURRENT_TIMESTAMP),
(5, 16, true, CURRENT_TIMESTAMP),
(5, 18, true, CURRENT_TIMESTAMP),
(5, 20, true, CURRENT_TIMESTAMP);

-- REVIEWS TABLE
INSERT INTO reviews (course_id, user_id, rating, comment) VALUES
(2, 1, 5, 'React felt hard at first, but this course explained everything so clearly.'),
(17, 1, 4, 'I thought deep learning would be too hard, but this course broke it down step-by-step.'),

(4, 2, 4, 'Great for beginners. Some parts could''ve gone a bit deeper though.'),
(6, 2, 4, 'Clear explanations and well-paced. I just wish there were a few more real-world examples.'),
(14, 2, 3, 'A really tough course! But I learned a ton.'),
(20, 2, 4, 'Super useful course, and I''ve already started using the tips in my own projects.'),

(3, 3, 4, 'Challenging but rewarding. The explanation of closures was especially helpful!'),
(15, 3, 4, 'Great AI overview. The NLP examples were a lot of fun.'),
(19, 3, 4, 'Super interesting content. Made me think differently about security.'),

(8, 4, 4, 'Practical and informative. Scrapy was new to me but fun to use.'),
(9, 4, 4, 'Well-structured and comprehensive. I just missed some more depth on authentication.'),
(11, 4, 5, 'Exactly what I needed to build my own APIs. Straight to the point!'),

(13, 5, 4, 'Fantastic intro! I built my first app after just a few lessons.'),
(16, 5, 3, 'Solid content with a hands-on focus. Loved working with real datasets.'),
(18, 5, 4, 'Well-structured course. I especially liked the section on threat analysis.'),
(20, 5, 5, 'One of the best courses I''ve taken! Learned a lot about preventing security flaws.');
