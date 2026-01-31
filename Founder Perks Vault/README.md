# Founder Perks Vault

A gated vault of startup SaaS perks where some deals are public and others are locked behind verification.

## Tech Stack

**Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB connection string and JWT secret
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

- `/frontend` - Next.js application
- `/backend` - Express.js API server
