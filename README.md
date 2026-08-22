# FitTrack

FitTrack is a full-stack fitness and wellness platform designed to help users manage workouts, personalized diet plans, subscription access, and fitness progress tracking. The system provides role-based access for both users and administrators, enabling secure authentication, assignment of exercises and diet plans, and digital subscription management.

## Overview

This project combines a React + Vite frontend with an Express + MongoDB backend to deliver a fitness application with:

- User authentication and authorization
- Admin dashboard for user and content management
- Personalized exercise assignment by gender and user
- Diet plan assignment and tracking
- Subscription plans and coupon support
- Razorpay-based payment flow
- Password reset mechanism via email
- Fitness exercise camera experience using browser-based pose analysis

## Project Architecture

The application is organized into two primary parts:

- Frontend: React application for user interface and client-side routing
- Backend: Express server with MongoDB models, controllers, routes, and middleware

### Repository Structure

```bash
FitTrack/
├── backend/
│   ├── config/
│   ├── Controller/
│   ├── Middleware.js/
│   ├── model/
│   ├── Routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── package.json
├── README.md
└── .gitignore
```

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Webcam
- Three.js / React Three Fiber
- Razorpay JS integration

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer
- Cloudinary
- Multer
- Razorpay API

## Features

### User Features
- User signup and login
- Password reset through secure email link
- Additional profile information collection
- Personalized dashboard
- View assigned exercises
- View assigned diet plans
- Subscription plan selection and checkout
- Coupon application support
- Exercise camera page for guided movement testing

### Admin Features
- Admin authentication and restricted routes
- User management dashboard
- View individual user profiles and details
- Create and assign exercises by gender
- Create and assign diet plans
- Manage subscription plans and coupons
- View payment transactions
- Maintain workout and diet content centrally

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB instance or MongoDB Atlas connection
- A Razorpay account for payment integration
- Cloudinary account for image upload functionality
- SMTP-enabled email service for password reset emails

## Environment Setup

Create a `.env` file inside the `backend` directory with the required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAIL_USER=your_email_address
MAIL_PASS=your_email_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> Note: Keep all secret values in environment variables and never commit them to version control.

## Installation

### 1. Install root dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Project

From the root directory, start both frontend and backend together:

```bash
npm start
```

This runs the app using the root script defined in `package.json`, which launches the backend server and frontend dev server concurrently.

### Run separately

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

The frontend usually runs on:

```bash
http://localhost:5173
```

The backend API typically runs on:

```bash
http://localhost:5000
```

## Main API Endpoints

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password/:token`
- `GET /api/v1/auth/user-auth`
- `GET /api/v1/auth/admin-auth`

### User Management
- `GET /api/v1/auth/admin/users`
- `GET /api/v1/auth/admin/users/:id`
- `PUT /api/v1/auth/user/additional-info`
- `GET /api/v1/auth/user-info/:id`

### Exercise Management
- `POST /api/v1/exercises/add`
- `POST /api/v1/exercises/assign`
- `GET /api/v1/exercises/assigned/:userId`
- `GET /api/v1/exercises/:gender`

### Diet Management
- `POST /api/v1/diet/add`
- `POST /api/v1/diet/assign`
- `GET /api/v1/diet/assigned/:userId`
- `GET /api/v1/diet/:category`

### Subscription & Payment
- `POST /api/v1/subscription/create-subscription`
- `GET /api/v1/subscription/subscriptions`
- `POST /api/v1/subscription/create-coupon`
- `GET /api/v1/subscription/coupons`
- `POST /api/v1/subscription/apply-coupon`
- `POST /api/v1/subscription/create-order`
- `POST /api/v1/subscription/save-transaction`
- `GET /api/v1/subscription/all-transactions`

## Default Roles

- `user`: normal application user
- `admin`: system administrator with management privileges

Access to admin-only routes is restricted through middleware in the backend.

## Security Notes

- JWT tokens are used for protected routes.
- Admin-only endpoints are guarded by authentication and role checks.
- Sensitive credentials must be stored in environment variables.
- Password reset links are time-limited and sent using email services.

## Development Notes

This project follows a standard full-stack architecture pattern:

- Frontend handles presentation, state, navigation, and client-side logic.
- Backend exposes structured REST APIs for data processing and business logic.
- MongoDB stores users, exercises, diets, subscriptions, and transactions.
- Cloudinary handles uploaded media assets.
- Razorpay provides secure payment processing.

## Deployment Guidance

For deployment, consider:

1. Hosting the frontend on Vercel, Netlify, or a similar static host
2. Hosting the backend on Render, Railway, DigitalOcean, or AWS
3. Using a managed MongoDB database like MongoDB Atlas
4. Configuring environment variables in the deployment environment
5. Setting up a production-grade email provider and Razorpay live keys

## Contribution

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a pull request with a detailed description of the changes

## License

This project is currently unlicensed unless explicitly specified otherwise. If you plan to distribute or commercialize the project, add a proper license file and terms of use.

## Contact

For project-related questions, support, or collaboration, contact the project maintainer through the repository owner or registered project contact.

---

FitTrack is structured as a scalable fitness management platform and can be extended with new features such as analytics dashboards, progress reports, AI-based workout coaching, and mobile app support.
