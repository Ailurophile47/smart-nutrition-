# Smart Nutrition Tracker

Monorepo for a production-ready Smart Nutrition Tracker.

## Structure

- `client/`: React + Vite frontend
- `server/`: Node + Express + MongoDB backend
- `shared/`: shared macro constants/utilities

## Run Locally

1. Install root dependencies:

```bash
npm install
```

2. Configure env files:

- `server/.env`
	- `PORT=5000`
	- `MONGO_URI=<your_mongodb_connection_string>`
	- `JWT_SECRET=<your_secret>`
- `client/.env`
	- `VITE_API_BASE_URL=http://localhost:5000/api`

3. Start backend and frontend in separate terminals:

```bash
npm run dev:server
npm run dev:client
```

## Phase 1 Focus

- Add meal API
- Macro calculation service
- Dashboard totals
- Add meal UI flow

# smart-nutrition-
