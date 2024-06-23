# AI-Powered Job Portal Project Documentation

## Overview

The AI-Powered Job Portal project is a full-stack web application designed to facilitate job searching and job posting. This portal offers advanced features for both job seekers and recruiters, including AI-generated job descriptions, providing a seamless and efficient experience for job hunting and recruitment. The application is built with robust authentication mechanisms, role-based access control, and an approval system to ensure the quality of job listings.

## Features

# Authentication and Authorization

- **JWT Authentication**: The application uses JSON Web Tokens (JWT) for secure authentication.
- **Sign In and** Sign Up: Users can create an account or log in to an existing account.
- **Forgot Password:** Users can reset their password by receiving a verification code via email.
- **Send Verification Code**: A verification code is sent to the user's email for account recovery.
- **Set New Password**: Users can set a new password using the verification code.
- **Role-Based Access Control**: There are two main roles - Admin and Recruiter. Access to certain features and routes is controlled based on these roles.

## AI-Powered Features

- **AI-Generated Job Descriptions**: Recruiters can generate job descriptions using AI, making the job posting process faster and more efficient.

## Job Posting and Approval

- **Job Posting**: Recruiters can create job postings, which are not immediately visible to the public.
- **Job Approval**: Job postings go to an Admin page for approval. Admins can approve or delete job postings.
- **Admin Controls**: Admins have the ability to manage job postings and ensure the quality of listings.
-

## Job Searching

- **Public and Private Routes**: Certain routes are accessible only after authorization.
- \*\*Search Filters: Users can filter job listings by:
- Name
- Type
- Location
- Minimum Salary
- Maximum Salary
- Pagination: Job listings are paginated for better user experience and performance.

## Technology Stack

### Frontend

- Next.js: For server-rendered React applications.
- React: For building the user interface.
- React Router: For managing public and private routes.
- Redux: For state management.
- Tailwind CSS: For styling the application.
- Radix UI: For accessible components like Dialog, Icons, Select, and Tabs.
- React Markdown: For rendering markdown content.
- React Draft WYSIWYG: For rich text editing using Draft.js.
- Date-FNS: For date manipulation.
- CLSx: For utility class merging.
- React Hot Toast: For toast notifications.

### Backend

- Node.js: For server-side logic.
- Next.js Server Actions: For handling server-side logic within Next.js.
- MongoDB: For database management.
- Mongoose: For MongoDB object modeling.
- Prisma: For database ORM.

## Authentication

- JWT (JSON Web Tokens): For secure user authentication.
- Nodemailer: For sending emails (verification code).
- Bcrypt: For hashing passwords.

## AI Integration

- Google Generative AI: For generating job descriptions based on input provided by recruiters.

## Dependencies

```bash
{
  "@google/generative-ai": "^0.13.0",
  "@prisma/client": "^5.13.0",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-icons": "^1.3.0",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@types/markdown-draft-js": "^2.2.7",
  "bcrypt": "^5.1.1",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "date-fns": "^3.6.0",
  "draft-js": "^0.11.7",
  "jose": "^5.3.0",
  "markdown-draft-js": "^2.4.0",
  "next": "14.2.3",
  "nextjs-toploader": "^1.6.12",
  "nodemailer": "^6.9.13",
  "react": "^18",
  "react-dom": "^18",
  "react-draft-wysiwyg": "^1.15.0",
  "react-hot-toast": "^2.4.1",
  "react-icons": "^5.2.1",
  "react-markdown": "^9.0.1",
  "react-quill": "^2.0.0",
  "sharp": "^0.33.3",
  "tailwind-merge": "^2.3.0",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^3.23.7"
}
```

## User Roles and Permissions

### Admin

- Access to all job postings.
- Can approve or delete job postings.
- Manage user accounts.

### Recruiter

- Can create job postings.
- Can generate job descriptions using AI.
- Can update their own job postings.
- Cannot approve job postings.

### General User

- Can search and view job postings.
- Can apply filters to job search.

## Workflow

**User Registration and Authentication**:

Users sign up and log in using their credentials.
JWT tokens are used for secure authentication and authorization.

**Job Posting and Approval**:

Recruiters post jobs, which are sent to the admin for approval.
Recruiters can use AI to generate job descriptions.
Admin reviews and approves or deletes the job postings.
Approved jobs are visible to all users on the main page.

**Job Searching:**

Users can search and filter jobs based on various criteria.
Pagination is used to navigate through job listings.

## Security

- JWT: Secure tokens for authentication.
- Password Hashing: User passwords are hashed using Bcrypt before storing in the database.
- Email Verification: Ensures valid email addresses for account recovery.

## Future Enhancements

- User Profiles: Allow users to create and manage their profiles.
- Job Applications: Enable users to apply for jobs through the portal.
- Notifications: Implement email notifications for job posting approvals and other updates.

## Conclusion

The AI-Powered Job Portal project provides a comprehensive solution for job seekers and recruiters, ensuring secure and efficient job posting and searching. With robust authentication, role-based access control, AI-generated job descriptions, and an approval system, the portal maintains high-quality job listings and a user-friendly experience.
