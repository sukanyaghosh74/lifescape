# LifeScape Backend

This is the Node.js/Express backend for the LifeScape app.

## Features
- User authentication (JWT)
- Goal management (CRUD)
- AI insights proxy
- Blockchain interaction endpoint

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set your environment variables.
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/users/me` — Get current user profile
- `GET/POST/PUT/DELETE /api/goals` — Manage goals
- `POST /api/ai/insight` — Get AI-driven insights
- `POST /api/blockchain/store-goal` — Store goal on blockchain (placeholder) 