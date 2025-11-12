# MERN Dashboard

This folder contains a quick-start MERN stack dashboard project with a Node/Express backend and a React/Tailwind frontend.

## Folder structure

```
mern-dashboard/
├── server/    # Express + MongoDB backend
└── client/    # React + Tailwind frontend
```

---

## Backend (server)

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file based on `.env.example` and set your MongoDB connection string:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

The backend exposes CRUD endpoints under `http://localhost:5000/api/items`.

---

## Frontend (client)

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the React app:
   ```bash
   npm start
   ```

By default the client expects the backend to run on `http://localhost:5000`. To point to a hosted backend create a `.env` file and set `REACT_APP_API_URL`.

---

## Deployment hints

- **Backend:** push the `server` folder to GitHub and deploy on Render or similar. Remember to set environment variables.
- **Frontend:** push the `client` folder to GitHub and deploy on Vercel. Update `REACT_APP_API_URL` to your live backend URL.

This setup matches the quick instructions provided and is ready for local development.
