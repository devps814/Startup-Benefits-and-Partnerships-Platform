Founder Perks Vault

An interview-ready full-stack MVP built to demonstrate product thinking, modern frontend UX, and clean backend architecture.

This project simulates a startup benefits platform where early-stage founders can discover SaaS deals, with some deals gated behind eligibility and verification.

🚀 Project Overview

Founder Perks Vault is designed as a focused MVP, not a production-scale system.

The goal of this project is to showcase:

Clear end-to-end application flow

Thoughtful UI/UX with motion-driven interactions

Correct authentication and authorization concepts

Clean separation of frontend and backend

A codebase that is easy to explain and modify live during interviews

🧩 Core Application Flow

User registers or logs in

User browses available SaaS deals

Deals are shown as locked or unlocked

Locked deals clearly explain eligibility requirements

Eligible users can claim a deal

Claimed deals appear in the user dashboard with status tracking

🖥️ Frontend Architecture

Tech Stack

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Framer Motion

Key Pages

Landing Page
Premium SaaS-style layout with animated hero and clear value proposition

Deals Listing Page
Card-based layout with filters, search, and locked/unlocked states

Deal Details Page
Partner info, eligibility rules, and claim action with disabled states

User Dashboard
Displays claimed deals and their status (pending / approved)

Auth Pages (Login / Register)
Simple forms with graceful handling of backend unavailability

UI & Motion Philosophy

Motion is used to explain state changes, not as decoration

Page transitions, hover feedback, and skeleton loaders are included

Dark theme with muted amber and slate tones for a calm, modern feel

🛠️ Backend Architecture

Tech Stack

Node.js

Express.js

MongoDB with Mongoose

JWT-based authentication

REST APIs

Core Entities

User

Deal

Claim

API Endpoints

POST /auth/register

POST /auth/login

GET /deals

GET /deals/:id

POST /claims

GET /claims/me

Authorization Rules

JWT-protected routes

Unverified users cannot claim locked deals

Clear validation and error handling

Backend is designed to be resilient to temporary database issues

🔐 Authentication & Authorization Strategy

JWT tokens are issued on successful login/register

Protected routes validate tokens via middleware

Frontend stores auth state client-side

Access to locked deals is enforced both in UI and backend logic

⚠️ Known Limitations

In the deployed demo, authentication API calls may show
“Backend service unavailable. Demo mode enabled.”

This is due to environment and deployment configuration and is handled gracefully in the UI.

The authentication flow and backend logic are implemented and can be fully enabled by configuring environment variables and backend services.

🧪 Why This Is an MVP

This project intentionally avoids:

Admin panels

Payment systems

Email verification flows

Over-engineering or premature optimizations

The focus is on clarity, structure, and explainability, which aligns with real interview expectations.

🧠 Design & Engineering Decisions

Minimal but complete feature set

Clean folder structure with shallow nesting

Easy to locate and modify any feature live

Emphasis on product flow and user experience over raw feature count

🏁 Getting Started (Local Setup)
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev


Environment variables (example):

MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
NEXT_PUBLIC_API_URL=http://localhost:5000/api


