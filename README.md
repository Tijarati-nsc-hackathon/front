# Tijarati – Frontend (React + vite)

> **Tijarati** is a modern frontend interface for Algeria’s smart e-commerce platform. It supports sellers and admins with tools to manage shops, products, orders, payments, and customer risk – with full AI & analytics support.

---

## ✨ Key Features

| Module | Description |
| ------ | ----------- |
| **Authentication** | Login with JWT tokens stored securely (access + refresh rotation) |
| **RBAC UI** | Dynamic UI based on role: *Admin* (platform owner), *Manager* (shop owner) |
| **Shops & Products** | Full CRUD for shop info, product listings, and inventory status |
| **Order Flow** | Visual flow for order status updates: pending → paid → delivered → returned |
| **Returns Panel** | Approve or reject customer return requests directly from dashboard |
| **AI Risk Badge** | Orders labeled with AI risk levels (Low, Medium, High, Critical) using backend API |
| **Chatbot** | Smart product/ordering chatbot using RAG (Retrieval-Augmented Generation) |
| **Analytics** | Charts for revenue, return rates, risky orders – via  endpoints |
| **Mobile-Friendly** | Fully responsive UI (Tailwind CSS + Headless UI) |

uix figma :https://www.figma.com/design/Uirx0Fy6MQcOWhhQlltPkZ/Tejarati?node-id=93-627&t=QNglV1uY5k8j92DZ-0

---

## 🏗️ Tech Stack

| Layer       | Technology     |
| ----------- | -------------- |
| UI Framework | React 18.x     |
| Styling      | Tailwind CSS  |
| Routing      | React Router  |
| State Mgmt   | Context API / Redux (optional) |
| Auth         | JWT + Axios interceptors |
| Charts       | Recharts.js / Chart.js |
| HTTP         | Axios         |
| Form         | React Hook Form |
| Backend API  | NestJS @  |
| Chatbot API  | Flask AI RAG service |

---

## 🚀 Getting Started

```bash
# 1. Clone repo
git clone https://github.com/your-org/tijarati-frontend.git
cd tijarati-frontend

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env

# 4. Run development server
pnpm dev

