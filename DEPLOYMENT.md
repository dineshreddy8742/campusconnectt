# Deployment guide — separate backend and frontend deployments

This project supports deploying the backend and frontend independently. The recommended flow:

1) Deploy backend (Render)
2) Deploy frontend (Vercel / Netlify / Render static) and point it at the backend URL

Steps — backend (Render)

- Option A (one-click using manifest):
  - In Render, create a new service and choose "Deploy with render.yaml". The repository contains `render-backend.yaml` which defines a backend-only service.
  - After connect, deploy the `render-backend.yaml` service. Set the following environment variables in the Render dashboard for the backend service:
    - MONGO_URI — your MongoDB connection string (required)
    - JWT_SECRET — a strong secret for signing auth tokens (required)
    - FRONTEND_URL — the URL where you will host the frontend (optional now; you can set later)
    - PORT — optional (defaults to 5000)
  - Once deployed, note the backend service URL, for example: `https://campus-connect-backend.onrender.com`

- Option B (manual):
  - Create a new Web Service on Render and set Build command to `cd backend && npm ci` and Start command to `cd backend && npm start`.
  - Configure the environment variables listed above in the Render UI.

CORS note
- The backend server reads `FRONTEND_URL` from environment and uses it as the `Access-Control-Allow-Origin` value. Set `FRONTEND_URL` to your frontend's production URL (for example `https://your-frontend-host`) so browsers can call the API. If you leave it empty, the server defaults to `http://localhost:5173` (useful for local dev).

Testing the backend locally
- Create `backend/.env` from `backend/.env.example` and fill values (MONGO_URI, JWT_SECRET, optionally FRONTEND_URL and PORT)

  ```powershell
  cd backend
  copy .env.example .env
  # edit .env to add your values
  npm ci
  npm run dev
  ```

Steps — frontend (Vercel / Netlify / Render static)

- Build-time env var
  - The frontend uses `VITE_API_URL` at build time to determine where to send API requests.
  - Example value (when backend deployed to Render): `https://campus-connect-backend.onrender.com/api`

- Local test
  - Create `frontend/.env` from `frontend/.env.example` and set:
    - `VITE_API_URL=http://localhost:5000/api` (for local backend)

  ```powershell
  cd frontend
  copy .env.example .env
  # edit .env
  npm ci
  npm run dev    # for local dev
  npm run build  # to create production build
  ```

- Deploying on Vercel / Netlify / Render static
  - In your frontend host, add an environment variable `VITE_API_URL` with your backend URL: `https://campus-connect-backend.onrender.com/api`.
  - Build the frontend normally (the host will run the build command and embed the env var values into the built app).

One recommended flow (Render backend + Vercel frontend)
1. Deploy backend on Render (render-backend.yaml or manual). Copy the backend URL.
2. Deploy frontend on Vercel. In Vercel project settings, set `VITE_API_URL` to `${BACKEND_URL}/api`.
3. Set `FRONTEND_URL` in Render backend environment variables to the Vercel URL (so backend CORS allows calls from the frontend).

Troubleshooting
- If the frontend returns HTML for API endpoints (index.html), it means the frontend is calling the wrong host (the frontend dev server) instead of the backend. Ensure `VITE_API_URL` is set in the frontend build and that axios baseURL points to it.
- If you have CORS errors in browser, confirm `FRONTEND_URL` is set in backend and matches your frontend host.

If you want I can:
- Add an example Vercel deployment config
- Add CI scripts to automatically build and deploy the frontend after backend URL changes
- Walk through the Render UI and set these up interactively (paste screenshots/values)

*** End of guide ***
