# Robotics E-commerce & Online Training Website

A responsive full-stack website for selling robotics kits and online robotics training programs.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, JWT auth, Stripe Checkout integration
- Demo storage: in-memory data so you can run it immediately
- Optional: connect MongoDB later by replacing the in-memory store with models

## Features

- Responsive landing page
- Login and registration
- Product catalog with search/category filters
- Product details page
- Shopping cart with localStorage persistence
- Stripe Checkout endpoint
- Admin dashboard for products, orders, and contact messages
- Contact page with backend message storage

## Folder Structure

```txt
robotics-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── store/
│   ├── utils/
│   └── package.json
└── README.md
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The backend runs at:

```txt
http://localhost:5000
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173
```

## Demo Admin Login

```txt
Email: admin@roboticsnetcom.com
Password: admin123
```

You can change this in `backend/.env`.

## Stripe Setup

The app includes a real Stripe Checkout Session endpoint. Add your Stripe secret key to `backend/.env`:

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
```

Without a Stripe key, the checkout button redirects to the local success page for demo testing.

## Production Notes

Before production:

1. Replace in-memory storage with MongoDB/PostgreSQL.
2. Hash and store users in a real database.
3. Add Stripe webhooks to verify completed payments.
4. Add image upload/storage for products.
5. Add order emails and invoice generation.
6. Add stronger validation using a package like Zod or Joi.
7. Deploy backend and frontend separately or behind a reverse proxy.

## Deployment (Frontend + Backend)

This repo includes GitHub Actions workflows to deploy the full website:

- Frontend (`frontend`) is built and deployed to GitHub Pages via `.github/workflows/deploy-frontend.yml`.
- Backend can be triggered to deploy on Render via `.github/workflows/deploy-backend-render.yml`.

Required GitHub repository secrets:

- `PROD_API_URL` — the production backend base URL (example: `https://your-backend.onrender.com/api`). Used when building the frontend.
- `RENDER_SERVICE_ID` — your Render service ID for the backend (if using Render).
- `RENDER_API_KEY` — your Render API key (read/write deploy permission).

Steps to deploy:

1. Push your `main` branch to GitHub.
2. Add the required secrets in the repository Settings → Secrets → Actions.
3. For Render: create a Web Service on Render linked to this GitHub repo (or use the deploy-trigger workflow above and set `RENDER_SERVICE_ID` & `RENDER_API_KEY`).
4. After secrets are set, push to `main` — Actions will build the frontend and deploy it to the `gh-pages` branch, and will trigger a backend deploy to Render.

If you prefer a different provider for the backend (Vercel, Railway, Heroku), tell me which one and I will add a matching workflow and instructions.

### Deploying backend to Render (step-by-step)

1. Create a Render account at https://render.com and connect your GitHub repo.
2. In Render, create a new **Web Service** and connect it to this repository and the `main` branch. You can use the `render.yaml` template included in the repo — replace `<GITHUB_OWNER>` and `<GITHUB_REPO>` in `render.yaml` with your values.
3. Set the build command to `cd backend && pip install -r requirements.txt` and the start command to `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT` (these are included in `render.yaml`).
4. After the service is created, get the service ID from the Render dashboard (Service → Settings → Service ID).
5. Create an **API Key** in Render (Account → API Keys) with deploy permissions.
6. In your GitHub repository, add the following repository secrets (Settings → Secrets → Actions):
	- `RENDER_SERVICE_ID` — the service ID from Render
	- `RENDER_API_KEY` — the API key you created
	- `PROD_API_URL` — production backend URL (e.g. `https://your-service.onrender.com/api`)
7. Push to `main` — the `deploy-backend-render.yml` workflow will trigger a Render deploy automatically.

If you want, I can:
- Fill in `render.yaml` with your GitHub repo owner and repo name and open a PR for you to review.
- Create a dedicated GitHub Actions workflow that builds the `backend` and deploys the artifact to Render via `render` CLI (requires a Render service token).

### Deploying backend to Railway (recommended simple flow)

I added a GitHub Actions workflow to deploy the backend using the Railway CLI: `.github/workflows/deploy-backend-railway.yml`.

Steps to use Railway deploy workflow:

1. Create a Railway account at https://railway.app and connect your GitHub repo (optional).
2. Create a new Railway Project and add a Web Service; you can select this repository and `main` branch.
3. In Railway, create an API key (User → Tokens or Project settings) and copy it.
4. (Optional) Note the Railway Project ID from the Railway dashboard.
5. In your GitHub repository, add these repository secrets (Settings → Secrets → Actions):
	- `RAILWAY_API_KEY` — your Railway API token
	- `RAILWAY_PROJECT_ID` — optional, the project ID
	- `PROD_API_URL` — production backend URL (set after Railway gives you the service URL)
6. Push to `main`. The `deploy-backend-railway.yml` workflow will install the Railway CLI and run `railway up` in `backend/` to deploy.

If you want, I can fill `render.yaml` or help connect Railway directly; tell me which and I will prepare a PR.


