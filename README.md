# 🌐 WMK Trust Management System

A full-stack web application for managing members, payments, and center-based operations for WMK Trust.

---

## 🔗 Live Demo

* 🌍 Frontend: https://wmk-trust-client.vercel.app
* ⚙️ Backend API: https://wmk-trust-backend.onrender.com

---

## 📂 GitHub Repositories

* 🖥️ Frontend: https://github.com/mdalauddin45/wmk-trust-client
* 🛠️ Backend: https://github.com/mdalauddin45/wmk-trust-backend

---

## 🚀 Features

### 👥 Member Management

* Add new members
* Assign members to specific centers
* View all registered members
* Unique Member ID generation

### 🏢 Center-Based System

* Multiple centers support
* Each center has its own admin
* Center admin can manage only their members

### 💳 Payment System

* SSLCommerz payment integration
* Secure payment processing
* Supports both authenticated & guest payments

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access (Admin / Center Admin)
* Protected API routes

### 📊 Dashboard

* Overview of members and payments
* Dynamic data display

---

## 🧱 Tech Stack

### 🎨 Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* React Hooks

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### 💰 Payment Gateway

* SSLCommerz

### ☁️ Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 Project Structure

### Frontend

```
/app
/components
/hooks
/utils
```

### Backend

```
/controllers
/models
/routes
/middleware
```

---

## ⚙️ Environment Variables

### 🔑 Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=https://wmk-trust-backend.onrender.com
```

### 🔑 Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_password
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/mdalauddin45/wmk-trust-client
git clone https://github.com/mdalauddin45/wmk-trust-backend
```

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd wmk-trust-client
npm install
npm run dev
```

#### Backend

```bash
cd wmk-trust-backend
npm install
npm run start
```

---

## 🔄 API Endpoints (Sample)

### Member

* `POST /api/members` → Add member
* `GET /api/members` → Get all members

### Payment

* `POST /api/payments/init` → Initialize payment
* `POST /api/payments/success` → Payment success callback

---

## 🧪 Future Improvements

* 📱 Mobile responsiveness improvements
* 📊 Advanced analytics dashboard
* 🔔 Notification system
* 🌍 Multi-language support

---

## 👨‍💻 Author

**Md Ala Uddin**

* 🌐 LinkedIn: https://www.linkedin.com/in/mdalauddin-zero2codes
* 💼 Company: Zero2Codes

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

## 🔑 Admin Access (Demo Credentials)

You can access the admin dashboard using the following default credentials:

### 🌐 Admin Login Portal

👉 https://wmk-trust-client.vercel.app/admin

### 👤 Super Admin

* **Email:** [admin@wmktrust.com](mailto:admin@wmktrust.com)
* **Password:** 123456

### 👤 Secondary Admin

* **Email:** [admin10@wmk.com](mailto:admin10@wmk.com)
* **Password:** 123456

---

⚠️ **Note:**

* These credentials are for demo/testing purposes only
* It is recommended to change the password in production
* Unauthorized access is restricted via backend authentication

---
