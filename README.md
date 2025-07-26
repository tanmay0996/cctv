1. Deployment Instructions
Frontend & API are deployed using Vercel.

Database: Supabase (PostgreSQL) handles data storage and auth.

Environment variables used:
DATABASE_URL=your_supabase_postgres_url
DIRECT_URL=your_direct_connection_url

To run locally:

bash

git clone https://github.com/your-username/tanmay0996-cctv.git
cd tanmay0996-cctv
npm install
npx prisma generate
npx prisma db push
npm run dev
2. Tech Decisions
Next.js (App Router): Simplified routing, API handling, server/client split

TypeScript: Strict typing and better developer experience

Tailwind CSS: Utility-first styling, responsive by design

Prisma ORM: Schema-first, easy DB access

Supabase (PostgreSQL): Fully hosted DB and backend service

Vercel: Seamless CI/CD and edge deployments

SVG-based Timeline: Chosen for performance, flexibility in drawing

3. If I Had More Time…
🧱 Implement 3D Camera Layout Visualization using React Three Fiber

🧑‍💻 Add proper authentication and role-based access on the backend

🎨 Polish UI with interactive transitions and Framer Motion

🔎 Add zoom/scroll support on the timeline for finer control

🧪 Include unit/integration tests (Jest + React Testing Library)

📥 Improve timeline with hover thumbnails and incident filtering
