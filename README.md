# 📚 Learning Management System (LMS)

A full-stack Learning Management System inspired by modern e-learning platforms, where students can enroll in courses, teachers can create and manage content, and admins control the entire platform.

---

## 🔗 Live Demo

Frontend: https://mern-project-frontend-ltty.onrender.com/
Backend API: https://mern-project-spx0.onrender.com

---

## 🔐 Demo Credentials

### 👨‍🎓 Student

Email: user1@gmail.com
Password: 123456

### 👨‍🏫 Teacher

Email: sabree@gmail.com
Password: 123456

### 🛠️ Admin

Email: admin@gmail.com
Password: 123456

---

## ✨ Features

### 👨‍🎓 Student

* Register & Login (JWT Authentication)
* Browse Courses by Category
* Add to Cart & Wishlist
* Secure Course Enrollment using Stripe
* Watch Video Lessons
* Add Reviews & Comments
* Download Certificate after course completion

### 👨‍🏫 Teacher

* Apply to become a Teacher (Portfolio submission)
* Create, Update & Delete Courses
* Upload Lessons (Video support)
* Manage Notifications
* Respond to Reviews & Comments

### 🛠️ Admin

* Approve/Reject Teacher Applications
* Dashboard Analytics
* Manage Users (Ban/Unban)
* Manage Course Categories
* Handle Support Queries
* Notification System

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* Plyr / React Player
* Heroicons & Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt (Password Hashing)

### Integrations

* Stripe (Payments)
* Cloudinary (Image Uploads)
* Multer (File Uploads)
* PDFKit (Certificate Generation)

---

## ⚙️ Installation & Setup

### 1. Clone Repository

git clone https://github.com/suresh1805200023-byte/mern-project/

### 2. Install Dependencies

cd backend
npm install

cd ../frontend
npm install

### 3. Run Project

Backend:
npm start

Frontend:
npm run dev

---

## 🌐 Environment Variables

Create a `.env` file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret

Frontend `.env`:

VITE_API_BASE_URL=your_backend_url/api
VITE_BACKEND_URL=your_backend_url

---

## 📸 Screenshots

###Home page
<img width="1884" height="907" alt="image" src="https://github.com/user-attachments/assets/adee1379-475a-41c2-ac25-07d8a438874c" />
###Course page
<img width="1889" height="907" alt="image" src="https://github.com/user-attachments/assets/99be7739-ea24-477f-b7ee-fd03290bfad3" />
###Student Dashboard
<img width="1890" height="851" alt="image" src="https://github.com/user-attachments/assets/67064376-e3ba-4391-b7bf-771cda749660" />
###Course learning page
<img width="1883" height="904" alt="image" src="https://github.com/user-attachments/assets/f20c5315-d639-4daa-beb7-800c0c78fea5" />
###Teacher Dashboard
<img width="1888" height="909" alt="image" src="https://github.com/user-attachments/assets/24b00c99-73be-4d0c-9a75-9b3f7161c4b7" />
###Admin dashboard
<img width="1885" height="911" alt="image" src="https://github.com/user-attachments/assets/07c7b784-d467-445f-8574-11d0ac1f9e24" />




---

## ⚠️ Note

* Backend may take 20–30 seconds to wake up (Render free tier).
* Use demo credentials to explore features.

---

## 🚀 Future Improvements

* Real-time notifications with Socket.io
* Advanced analytics dashboard
* Improved mobile responsiveness
* Course progress tracking UI

---

## 👨‍💻 Author

Suresh Kumar
GitHub: https://github.com/suresh1805200023-byte

---
