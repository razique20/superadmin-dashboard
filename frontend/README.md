# 🛡️ Super Admin Dashboard with Role-Based Access Control

A role-based access control (RBAC) React app that enables Super Admins to manage users and permissions across 10 dynamic pages with real-time access enforcement.

## 🚀 Features

### ✅ Authentication & Session Management
- Role-based login (`Superadmin`, `User`)
- Auto-redirect after login:
  - Superadmin → `/dashboard`
  - User → `/user-dashboard`
- Session expires after 1 hour of inactivity
- OTP-based password recovery flow

### 🧑‍💼 Super Admin Capabilities
- Create users (email + auto-generated strong password)
- View user list with assigned permissions
- Manage permissions across 10 pages via dynamic side panel
- Permissions supported: `View`, `Edit`, `Create`, `Delete`

### 👥 Regular User Capabilities
- View dashboard with 10 available pages
- Access pages only if permission is granted
- View/edit/delete/create comments based on role permissions
- View own profile (email is read-only)
- Reset password via OTP

### 📝 Dynamic Pages (10 Total)
Each page includes:
- Page Title
- Comment Section with:
  - Viewable to users with `View` access
  - Editable for users with `Edit` access
  - Deletable for users with `Delete` access
  - Creatable for users with `Create` access
- Comment modification history (only visible to Super Admin)

Pages:
1. Products List  
2. Marketing List  
3. Order List  
4. Media Plans  
5. Offer Pricing SKUs  
6. Clients  
7. Suppliers  
8. Customer Support  
9. Sales Reports  
10. Finance & Accounting

---

## 🧑‍💻 Tech Stack

- **Frontend:** React + TailwindCSS
- **State Management:** Context API
- **Routing:** React Router
- **Storage:** localStorage for session & permissions
- **Form Handling:** React hooks (`useState`, `useEffect`)
- **Security:** Basic role-based control on frontend

---

## 📁 Project Structure

src/
│
├── components/ # Reusable UI components
│ ├── CreateUserForm.jsx
│ ├── UserTable.jsx
│ ├── PermissionPanel.jsx
│
├── contexts/ # Auth context for session & user state
│ └── AuthContext.jsx
│
├── pages/ # Route pages
│ ├── LoginPage.jsx
│ ├── Dashboard.jsx # Superadmin dashboard
│ ├── UserDashboard.jsx # User page selector
│ └── dynamic-pages/ # All 10 comment-based pages
│
├── utils/ # Utilities (e.g., OTP generation, password)
│
└── App.jsx # Main app routing

yaml
Copy
Edit

---

## 🧪 Setup & Run

```bash
# Clone the repo
git clone https://github.com/your-username/super-admin-dashboard.git
cd super-admin-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
🔐 Login Credentials (Demo)
Superadmin:
Email: admin@demo.com
Password: admin123

User:
Email: user@demo.com
Password: user123

📌 Notes
Access is enforced client-side for demo purposes.

This project can be extended with a backend (Django, Node.js) and database (MongoDB, PostgreSQL) for production use.

