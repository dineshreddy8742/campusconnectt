This project has been configured to run locally for development.

Notes:
- Deployment instructions and hosted URLs were removed per request. If you later want to deploy the app, please add deployment docs back or ask me to re-create them.
- API requests in development will use `http://localhost:8000/api` by default (see `frontend/src/lib/axios.js`). In production the app will use a relative `/api` path.
- Google Sign-In requires a Google OAuth client ID configured in the Google Cloud Console and the client ID set in `frontend/.env` as `VITE_GOOGLE_CLIENT_ID`. If that env var is not present the Google button will be hidden to avoid errors in local development.

If you need help re-adding a deployment section later, I can add a minimal, safe guide.
