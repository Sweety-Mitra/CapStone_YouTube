# 🎬 YouTube Clone – MERN Stack Capstone Project

## 📌 Project Overview
This project is a **full-stack YouTube Clone** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
The application replicates core YouTube features such as video browsing, user authentication, video playback, comments, likes/dislikes, channels, and search & filter functionality.

---

## 🚀 Features

### 🔐 User Authentication
- User Registration & Login
- JWT-based authentication
- Input validation with proper error messages
- User profile display after login
- Protected routes for channels, videos, and comments

---

### 🏠 Home Page
- YouTube-style header with:
  - Logo
  - Search bar
  - Sign-in / User info
- Toggleable sidebar (hamburger menu)
- Category filter buttons (minimum 6 categories)
- Responsive video grid displaying:
  - Thumbnail
  - Title
  - Channel name
  - Views

---

### 🔍 Search & Filters
- Search videos by title (real-time filtering)
- Category-based filters
- Dynamically uploaded videos appear under relevant filters

---

### ▶️ Video Player Page
- Video playback
- Video title & description
- Channel name
- Like & Dislike buttons (fully functional)
- Comment section with full CRUD:
  - Add comments
  - Edit comments
  - Delete comments

---

### 📺 Channel Page
- Channel creation (only for logged-in users)
- Display channel details
- View all videos uploaded by the channel
- Video management (CRUD):
  - Upload video
  - Edit video
  - Delete video

---

### 📱 Responsive Design
- Fully responsive layout
- Optimized for:
  - Mobile
  - Tablet
  - Desktop

---

## 🛠️ Tech Stack

### Frontend
- React (with **Vite**)
- React Router
- Axios
- CSS / Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB 
- JWT (JSON Web Tokens)

### Database
- MongoDB Collections:
  - Users
  - Videos
  - Channels
  - Comments

---

## ⚙️ Installation & Setup

### 📥 Clone the Repository
```bash
git clone https://github.com/Sweety-Mitra/CapStone_YouTube.git
cd YouTube

## 🖥️ Running the Server
```bash
cd server

### Install dependencies
```bash
npm install