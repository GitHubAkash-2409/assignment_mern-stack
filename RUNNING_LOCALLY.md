# Running the Project Locally

This document explains how to run both the backend (server) and frontend (client) locally.

## Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm installed
- Git (optional)

## Repository layout (relevant folders)
- `server/` — Express backend API
- `client/` — Next.js frontend

---

## Server (backend)

1. Open a terminal and go to the server folder:

```bash
cd server
```

2. Install dependencies (npm or pnpm):

```bash
pnpm install
```

3. Configure environment variables:

- The server reads `server/.env` for `MONGO_URL` when using MongoDB. For development the project uses an in-memory seed by default, so MongoDB is optional.
- If you want to connect to MongoDB Atlas, create or edit `server/.env` with:

```env
MONGO_URL=your-mongodb-connection-string
PORT=8000 # optional, defaults to 8000
```

4. Start the server:

```bash
pnpm start
# or for development with nodemon (if installed):
# npx nodemon src/server.js
```

The server will listen on port `8000` by default. API endpoints:
- GET  /api/products
- GET  /api/products/:id
- POST /api/products
- PUT  /api/products/:id
- DELETE /api/products/:id

Notes:
- By default the server uses an in-memory dataset (`server/src/data.js`). This means data is reset when the server restarts.
- To use MongoDB instead, set `MONGO_URL` in `server/.env` and implement the DB-backed model (the project contains an in-memory implementation for easy local dev).

---

## Client (frontend)

1. Open a new terminal and go to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables (client-side):

Create or edit `client/.env.local` with the API URL your backend is running on (default `http://localhost:8000`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the Next.js dev server:

```bash
pnpm dev
```

- Next.js normally runs on `http://localhost:3000` (but if port 3000 is occupied it may switch to another port like 3002).
- The frontend uses `NEXT_PUBLIC_API_URL` to fetch backend data.

---

## Quick verification
- Open the backend status endpoint in a browser or curl:

```bash
curl http://localhost:8000/
# expected response: { "ok": true, "message": "Products API" }
```

- Open the frontend (e.g., `http://localhost:3000`) and verify that the product listing page shows products.

---

## Admin and cart notes
- The admin product management UI uses the same API endpoints for CRUD operations.
- The cart state persists to `localStorage` in the browser. If cart updates do not show, try clearing localStorage or open the app in an incognito window.

---

## Troubleshooting
- "fetch failed" in the frontend: Confirm `NEXT_PUBLIC_API_URL` is correct and server is running on that URL.
- MongoDB connection errors: Add your machine IP or the CI server IP to Atlas IP access list, or use the in-memory dataset for local development.
- Port conflicts: If a port is in use, change the `PORT` (server) or choose an available port for Next.js when it prompts.

---

## Useful commands summary

Server:

```bash
cd server
pnpm install
pnpm start
```

Client:

```bash
cd client
pnpm install
pnpm run dev
```