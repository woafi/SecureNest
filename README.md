# 🔐 SecureNest - Modern Password Manager

A full-stack password manager built with TypeScript, featuring military-grade AES-256-GCM encryption, Firebase authentication, and a beautiful dark-mode UI with smooth animations.

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen) [![Live Demo](https://img.shields.io/badge/Visit%20Demo-secure--nest--frontend--pi.vercel.app-blue)](https://secure-nest-frontend-pi.vercel.app/) [![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

## ✨ Features

- 🔐 **Secure Authentication** - Email/password and Google OAuth via Firebase
- 🔒 **AES-256-GCM Encryption** - Military-grade password encryption with unique IV per password
- 🎨 **Modern UI** - Beautiful interface inspired by 1Password and Bitwarden
- 🌓 **Dark Mode** - Smooth theme toggle with localStorage persistence
- ✨ **Animations** - Smooth transitions with Framer Motion
- 🔍 **Search** - Filter passwords instantly
- 🎲 **Password Generator** - Customizable strong password generation
- 📱 **Responsive** - Works seamlessly on all devices
- ⚡ **Fast** - Lightning-fast performance with Vite
- 🛡️ **Type Safe** - Full TypeScript support throughout the stack

## 🚀 Live Demo

Experience SecureNest live: [https://secure-nest-frontend-pi.vercel.app/](https://secure-nest-frontend-pi.vercel.app/)

> **Note:** Both the frontend and backend are deployed on Vercel for optimal performance and scalability.

## 📸 Screenshots

<!-- Add your screenshots here -->
![Home](./screenshots/Landing.png)

## 🏗️ Tech Stack

### Backend
- **Express.js** - REST API framework for building the backend server
- **TypeScript** - Type safety
- **Database** - PostgreSQL
- **Prisma** - ORM for PostgreSQL
- **Firebase Admin SDK** - JWT verification
- **AES-256-GCM** - Password encryption
- **Express Validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Firebase SDK** - Authentication
- **Lucide React** - Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ and npm
- **PostgreSQL** database
- **Firebase project** (for authentication)

## 🔧 Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/SecureNest.git
cd SecureNest
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file in the backend directory (see Environment Variables section)

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file in the frontend directory (see Environment Variables section)

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/secure_nest"
PORT=5000
ENCRYPTION_KEY=<64-character-hex-string>
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📁 Project Structure

```
SecureNest/
├── backend/                    # Express.js backend
│   ├── prisma/
│   │   ├── migrations/        # Database migrations
│   │   └── schema.prisma      # Database schema
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   └── firebase.ts    # Firebase Admin setup
│   │   ├── controllers/       # Route controllers
│   │   │   ├── authController.ts
│   │   │   └── passwordController.ts
│   │   ├── middleware/        # Express middleware
│   │   │   └── auth.ts        # JWT verification
│   │   ├── routes/            # API routes
│   │   │   ├── auth.ts
│   │   │   └── passwords.ts
│   │   ├── utils/             # Utility functions
│   │   │   └── encryption.ts  # AES-256-GCM encryption
│   │   ├── app.ts             # Express app configuration
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # React frontend
    ├── src/
    │   ├── components/        # Reusable React components
    │   │   ├── AppRoutes.tsx
    │   │   ├── DashboardHeader.tsx
    │   │   ├── PasswordCard.tsx
    │   │   ├── PasswordGenerator.tsx
    │   │   └── ...
    │   ├── contexts/          # React contexts
    │   │   ├── AuthContext.tsx
    │   │   └── ThemeContext.tsx
    │   ├── pages/             # Page components
    │   │   ├── Dashboard.tsx
    │   │   ├── Landing.tsx
    │   │   ├── SignIn.tsx
    │   │   └── ...
    │   ├── config/            # Configuration
    │   │   └── firebase.ts    # Firebase client setup
    │   ├── services/          # API services
    │   │   └── api.ts         # Axios instance
    │   ├── App.tsx            # Main App component
    │   └── main.tsx           # Entry point
    ├── public/                # Static assets
    ├── package.json
    └── vite.config.ts
```

## 🔌 API Endpoints

The backend REST API is built with Express.js and provides the following endpoints:

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Passwords (Protected Routes)
- `GET /api/passwords` - Get all passwords for authenticated user
- `POST /api/passwords` - Create a new password entry
- `GET /api/passwords/:id` - Get a specific password by ID
- `PUT /api/passwords/:id` - Update an existing password
- `DELETE /api/passwords/:id` - Delete a password entry

### Health Check
- `GET /health` - Server health check endpoint

**Note:** All password endpoints require authentication via Firebase JWT token in the `Authorization` header.

## 🛡️ Security

SecureNest implements multiple layers of security:

- **Password Encryption**: AES-256-GCM encryption with unique Initialization Vector (IV) per password
- **Authentication**: Firebase JWT tokens for secure user authentication
- **Authorization**: Middleware verifies JWT on all protected routes
- **Input Validation**: Express Validator validates all user inputs
- **CORS**: Configured to allow requests only from authorized frontend origin
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Secure Storage**: Encrypted passwords stored in PostgreSQL database

## 🚀 Deployment

Both the **Backend** and **Frontend** are deployed on [Vercel](https://vercel.com/) for seamless integration and optimal performance.

### Backend Deployment (Vercel)

The backend is deployed on Vercel. To deploy your own instance:
1. Set environment variables in Vercel dashboard
2. Configure PostgreSQL database (consider using Vercel Postgres or external provider)
3. Deploy using Vercel CLI or connect GitHub repository

### Frontend Deployment (Vercel)

The frontend is deployed on Vercel. To deploy your own instance:
1. Set environment variables in Vercel dashboard
2. Deploy using Vercel CLI or connect GitHub repository

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Author @Mohammad Woafi


**⭐ If you find this project helpful, please consider giving it a star!**

