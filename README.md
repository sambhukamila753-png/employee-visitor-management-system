# 🏢 VisitorIQ — Employee Visitor Management System (MERN Stack)

> **Industrial Visit Task — Full Stack Web Development**  
> **Problem Statement 1: Employee Visitor Management System**

![VisitorIQ Platform](https://img.shields.io/badge/MERN-Stack%20Application-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20%26%20Verified-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

---

## 📌 Executive Summary & Objective

Organizations frequently receive guests such as **clients, students, vendors, and interview candidates**. Relying on manual paper registers leads to human errors, delays, lack of searchability, and security vulnerabilities.

**VisitorIQ** is a full-stack digital visitor management web application built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. It enables receptionists, security personnel, and administrative teams to record, monitor, update, and retrieve visitor logs in real-time with an intuitive, modern user interface.

---

## ✨ Core Features & Functional Requirements

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Add New Visitor** | Full registration form with instant client & server validation for name, mobile, email, organization, host, purpose, and time. | ✅ Complete |
| **View All Visitors** | Dynamic data table with visitor avatars, status tags, visit durations, and host information. | ✅ Complete |
| **Update Visitor Details** | In-place modal to modify host, purpose, status, remarks, or contact information. | ✅ Complete |
| **Delete Visitor Record** | Secure two-step confirmation modal to prevent accidental data loss. | ✅ Complete |
| **Search Visitors** | Real-time search by **Visitor Name**, **Mobile Number**, **Organization**, or **Person to Meet**. | ✅ Complete |
| **Status Tracking** | Track status as **`Checked In`** (active on premises) or **`Checked Out`** (exited premises). | ✅ Complete |
| **Quick Check-Out** | One-click check-out button in the table row that automatically logs the exit timestamp. | ✅ Complete |
| **Visitor Pass Generator** | Generates an official, printable **Visitor Security Badge Pass** with simulated barcode. | 🌟 Extra Feature |
| **Export to CSV** | Receptionists can download formatted visitor registers as CSV files for audit reporting. | 🌟 Extra Feature |
| **Live KPI Dashboard** | Displays real-time counts: **Total Visitors**, **Currently Checked In**, **Checked Out**, **Today's Visits**. | 🌟 Extra Feature |
| **Dark & Light Modes** | Toggle between a sleek cyber-enterprise dark mode and a crisp clean corporate light mode. | 🌟 Extra Feature |
| **Zero-Config Resilient DB** | Connects to **MongoDB / MongoDB Atlas**; automatically falls back to local persistence if MongoDB is offline so tests run without setup blockers. | 🌟 Extra Feature |

---

## 📋 Visitor Information Fields

Each visitor entry captures the exact required fields:
- **Visitor Name** (`String`, Required, min 2 chars)
- **Mobile Number** (`String`, Required, 7–15 digits)
- **Email Address** (`String`, Valid email pattern)
- **Organization / College Name** (`String`, Required)
- **Person to Meet** (`String`, Required, Host Name & Role)
- **Purpose of Visit** (`Client Meeting`, `Job Interview`, `Industrial Visit`, `Vendor / Delivery`, `Campus / Student Visit`, `Official Discussion`, `Maintenance / Service`, `Other`)
- **Date and Time of Visit** (`DateTime`, ISO format, defaults to current time)
- **Check-Out Date and Time** (`DateTime`, populated upon check-out)
- **Status** (`Checked In` / `Checked Out`)
- **Badge Number** (Auto-generated unique code: e.g. `VIS-261005-9642`)
- **ID Proof Document** (`Aadhaar`, `College ID`, `Employee ID`, `Driving License`, etc.)
- **Remarks / Meeting Notes** (Optional meeting agenda or luggage details)

---

## 🏗️ Architecture & Technology Stack

```
VisitorIQ Application
├── Frontend (Client)
│   ├── React 19 (Component-driven UI)
│   ├── Vite 8 (Ultra-fast Dev Server & Bundler)
│   ├── Lucide React (Enterprise SVG icons)
│   └── Vanilla CSS3 (Custom design system, glassmorphism, responsive grid)
│
├── Backend (Server)
│   ├── Node.js (Runtime)
│   ├── Express.js (REST API framework)
│   ├── Mongoose ODM (Data modeling & validation)
│   ├── CORS & Morgan (Cross-origin handling & request logging)
│   └── Dotenv (Environment configuration)
│
└── Database (Data Layer)
    ├── Primary: MongoDB / MongoDB Atlas
    └── Fallback: Local JSON persistence engine (enables instant zero-install testing)
```

---

## 📂 Project Directory Structure

```
IBM Project/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Brand, live clock, theme switch, add CTA
│   │   │   ├── StatsCards.jsx          # KPI cards (Total, In, Out, Today)
│   │   │   ├── VisitorToolbar.jsx      # Live search, status tabs, purpose/date filters, CSV export
│   │   │   ├── VisitorTable.jsx        # Rich table view with avatar hash, badges, actions
│   │   │   ├── VisitorModal.jsx        # Add & Edit visitor modal dialog
│   │   │   ├── VisitorPassModal.jsx    # Printable Security Access Badge with barcode
│   │   │   ├── VisitorDetailsModal.jsx # Full-page details drawer
│   │   │   ├── DeleteConfirmModal.jsx  # Safety confirmation dialog
│   │   │   └── Toast.jsx               # Floating notification alerts
│   │   ├── services/
│   │   │   └── api.js                  # REST API client wrapper
│   │   ├── App.jsx                     # Core application orchestrator
│   │   ├── index.css                   # Custom Vanilla CSS Design System
│   │   └── main.jsx                    # React entry point
│   ├── index.html                      # HTML template with Google Fonts (Outfit & Plus Jakarta Sans)
│   ├── vite.config.js                  # Vite config with backend proxy
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                       # Database connection manager with fallback
│   ├── controllers/
│   │   └── visitorController.js        # Controller handlers for CRUD & stats
│   ├── models/
│   │   └── Visitor.js                  # Mongoose Schema & validation
│   ├── routes/
│   │   └── visitorRoutes.js            # Express API route declarations
│   ├── services/
│   │   └── visitorStorage.js           # Smart storage abstraction (MongoDB + Fallback)
│   ├── data/
│   │   └── visitors.json               # Seeded initial records
│   ├── .env                            # Environment variables
│   ├── .env.example                    # Environment template
│   ├── server.js                       # Server entry point
│   └── package.json
│
├── package.json                # Root scripts (run both client & server concurrently)
├── .gitignore                  # Git ignore definitions
└── README.md                   # Comprehensive documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher recommended; verified on Node v24)
- **npm** (v9 or higher)

### 1. Install Dependencies
Run the command below in the project root directory:
```bash
npm run install-all
```
*(This installs root, server, and client dependencies automatically).*

### 2. Configure Environment (Optional)
The server works out-of-the-box. To point to your own MongoDB instance or MongoDB Atlas cluster, update `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/visitor_management_system
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/visitor_db?retryWrites=true&w=majority
```

### 3. Start the Application
Run both backend and frontend concurrently with a single command from the project root:
```bash
npm run dev
```

- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Query / Body Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/visitors` | List all visitors | `?search=...&status=...&purpose=...&dateFilter=...` |
| `GET` | `/api/visitors/stats` | Dashboard statistics & KPIs | — |
| `GET` | `/api/visitors/:id` | Get details of a single visitor | — |
| `POST` | `/api/visitors` | Register / check-in a new visitor | JSON payload with visitor details |
| `PUT` | `/api/visitors/:id` | Update existing visitor details | JSON payload with updated fields |
| `PATCH` | `/api/visitors/:id/checkout` | Quick check-out action | Updates status to `Checked Out` and logs exit time |
| `DELETE` | `/api/visitors/:id` | Delete visitor record | — |
| `POST` | `/api/visitors/seed` | Reset & reload demo records | — |
| `GET` | `/api/health` | System and DB health status | — |

---

## 💡 Key Design & Technical Highlights

1. **Rich Aesthetics**:
   - Curated color scheme with deep blue, slate, emerald green, and amber indicators.
   - Glassmorphism header with backdrop blur effect.
   - Subtle pulse animations on active visitor statuses.
2. **Instant Search & Real-Time Filtering**:
   - Filter by status tabs (`All`, `Checked In`, `Checked Out`).
   - Filter by visit purpose (e.g., `Client Meeting`, `Job Interview`).
   - Real-time debounced query across visitor name, phone, host, and organization.
3. **Official Visitor Pass Generation**:
   - Reception can click the printer icon on any visitor to preview and print an official photo-ID badge pass with barcode simulation and visit metadata.
4. **Safety & Confirmation Modals**:
   - Delete operations require explicit confirmation to avoid accidental data loss.
5. **CSV Exporting**:
   - Receptionists can export visitor activity logs directly into a spreadsheet-compatible `.csv` file.

---

## 🎓 Academic / Evaluation Verification Checklist

- [x] **Add a new visitor record**: Verified via UI and API.
- [x] **View all visitor records**: Displayed in modern table with KPI cards.
- [x] **Update visitor details**: Verified via edit modal and API.
- [x] **Delete visitor records**: Verified with confirmation dialog and API.
- [x] **Search visitors by name or mobile number**: Verified via live search bar.
- [x] **Status management (Checked In / Checked Out)**: Instant status toggle & exit time logging.
- [x] **MERN Stack Compliance**: Node.js, Express, React, and Mongoose schema modeled with MongoDB support.
