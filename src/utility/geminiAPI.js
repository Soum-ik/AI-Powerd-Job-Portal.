import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINIAPI;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "write hireing job description for my company\n",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const AIchatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "write full stack developer hireing job description for my company, which is swastik\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "## Full Stack Developer - Swastik\n\n**Join our team at Swastik and help us build innovative solutions that make a difference!**\n\nWe are seeking a passionate and talented Full Stack Developer to join our growing team.  You will be responsible for developing and maintaining high-quality web applications, collaborating with designers and other developers to ensure seamless integration, and continuously learning and evolving your skills.\n\n**Responsibilities:**\n\n* Design, develop, and maintain front-end applications using HTML, CSS, JavaScript, and popular frameworks (React, Vue, Angular).\n* Develop and maintain back-end applications using Node.js, Python, or other suitable languages.\n* Design and implement APIs for seamless communication between front-end and back-end applications.\n* Implement and maintain databases (e.g., MySQL, PostgreSQL, MongoDB).\n* Write clean, well-documented code that follows best practices and coding standards.\n* Collaborate with designers and other developers to ensure consistent user experience and functionality.\n* Participate in code reviews and provide constructive feedback.\n* Stay up-to-date with the latest technologies and trends in the web development world.\n* Contribute to the development of our company's technical infrastructure.\n\n**Qualifications:**\n\n* Bachelor's degree in Computer Science, Software Engineering, or a related field.\n* 2+ years of experience as a Full Stack Developer.\n* Strong proficiency in HTML, CSS, JavaScript, and at least one front-end framework (React, Vue, Angular).\n* Experience with back-end development using Node.js, Python, or other relevant languages.\n* Experience with relational and NoSQL databases.\n* Familiarity with RESTful APIs and API design principles.\n* Excellent problem-solving and analytical skills.\n* Strong communication and collaboration skills.\n* Ability to work independently and as part of a team.\n* Passion for learning and staying up-to-date with new technologies.\n\n**Bonus Points:**\n\n* Experience with cloud platforms (AWS, Azure, GCP).\n* Experience with CI/CD pipelines.\n* Experience with Agile development methodologies.\n* Experience with test-driven development.\n* Experience with containerization technologies like Docker.\n\n**What we offer:**\n\n* Competitive salary and benefits package.\n* Opportunity to work on challenging and rewarding projects.\n* Collaborative and supportive work environment.\n* Continuous learning and development opportunities.\n* The chance to be part of a growing and dynamic company.\n\n**To Apply:**\n\nPlease submit your resume and a cover letter highlighting your relevant experience and why you're interested in joining Swastik. We look forward to hearing from you!\n\n**About Swastik:**\n\nSwastik is a leading company in the [mention your company's industry] industry. We are committed to providing innovative solutions that help our customers [mention company's mission or impact]. We are a team of passionate individuals who are driven by a shared desire to make a difference in the world.\n\n**Please note:** This job description is a sample and should be customized to fit the specific needs and requirements of your company. Make sure to include details about your company culture, values, and benefits. You can also include specific project examples or technologies that your team uses. \n" },
            ],
        },
    ],
});


