# <p align="center">FeedbackEcho AI</p>

> An AI-powered review management dashboard that aggregates, classifies, and drafts automated responses for remote homestay networks to protect their digital reputation.

---

## Tech Stack

**Frontend**
*   **Framework:** React
*   **Styling:** Tailwind CSS

**Backend**
*   **Environment:** Node.js 
*   **Framework:** Express
*   **Database:** MongoDB
*   **Local Server:** Configured to run on **Port 3000** (Optimized to avoid native system service conflicts on Apple Silicon/M1 architectures)

**AI & Authentication**
*   **AI Integration:** Groq API (Leveraging structured `responseMimeType: "application/json"` payloads for deterministic classification and response generation)
*   **Authentication:** JWT-based Auth with domain-level restrictions.

**Deployment**
*   **Frontend:** Vercel
*   **Backend:** Render

## 🗄️ Database Architecture

**Database Choice:** MongoDB (with Mongoose ODM)
**Why:** FeedbackEcho AI handles unstructured and semi-structured guest review data. MongoDB's document-based NoSQL architecture is perfect for this, allowing flexible schemas, fast read/write operations for dashboard analytics, and seamless integration with our Node.js/Express backend natively using JSON.

### Schema Diagram
![Database Schema Diagram](./path-to-your-schema-image.png) 
*(Note: Upload your schema PNG to your repo and replace this path, or just mention it is attached in the submission!)*

### 🚀 How to run the backend locally
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the backend folder using `.env.example` as a template.
4. Add your MongoDB URI: `MONGO_URI=your_cluster_string_here`
5. Start the development server: `npm run dev`
6. The API will be available at `http://localhost:3000`

---

## Frontend setup

1. Copy `backend/.env.example` to `backend/.env` and fill in the database, JWT, Groq, and Google values.
2. Copy `frontend/.env.example` to `frontend/.env`. For local development, keep `VITE_API_URL=http://localhost:3000/api`.
3. In separate terminals, run `npm run dev` inside `backend` and `frontend`.

The dashboard is protected by JWT authentication. Reviews are stored with their owner, so the API only returns and changes the logged-in user's records.

## Submission capture checklist

Capture the PDF from a real, logged-in session—never from placeholder data. Include the dashboard, a created review in the list, an edit followed by deletion, the AI input/loading/result sequence, an empty review state, and side-by-side 375px and 1440px views. Make the final page a Chrome DevTools Network capture with three successful API calls and the URL/Size columns visible. Save it as `W8_FrontendCompletion_[InternID].pdf`.
