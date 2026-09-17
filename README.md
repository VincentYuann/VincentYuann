# Vincent Yuann — Systems & Software Portfolio

> An interactive portfolio showcasing distributed backends, real-time collaboration architectures, and applied LLM retrieval systems.

---

## 🧭 Overview & What's Inside

Welcome to my portfolio! Designed to move beyond static resumes, this site is built as an interactive engineering journey:

* **🌊 The River Timeline** (`#/`): Trace technical milestones, flagship projects, and exploratory "pebbles" chronologically as an evolving stream.
* **🏛️ Projects & Systems Gallery** (`#/projects`): Explore production systems, full-stack applications, and AI pipelines with live filtering and search.
* **🔬 Architectural Deep-Dives** (`#/projects/:id`): Inspect detailed engineering breakdowns, latency benchmarks, protocol diagrams, and technical logs for flagship architectures.
* **⌘ Spotlight Command Search** (`Cmd + K` / `Ctrl + K`): Fast global keyboard navigation across all systems, tags, and milestones.
* **✉️ Protected Contact Channel** (`#/contact`): A secure reach-out form powered by serverless Edge Functions, Resend email dispatch, attachment support, and IP-based rate limiting.
* **⚙️ Live Admin CMS** (`#/admin`): A lightweight management console authenticated via GitHub OAuth and secured with PostgreSQL Row-Level Security (RLS) for managing projects and bio content in real time.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router
* **Backend & Database**: Supabase (PostgreSQL with Row-Level Security, Serverless Edge Functions)
* **Email Delivery**: Resend API with server-side validation and file attachments
* **Deployment**: Static SPA architecture with GitHub Pages compatibility

---

## 🚀 Running Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/VincentYuann/VincentYuann.git
cd VincentYuann
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📬 Contact

Have a question or looking to collaborate? Reach out directly through the [interactive contact form](https://vincentyuann.github.io/#/contact) or connect on [GitHub](https://github.com/VincentYuann).
