# Polling System

This is a simple **Polling System** built using **Node.js**, **Express**, **JWT Authentication**, and **MongoDB** on the backend, with a basic **HTML + JavaScript (Vanilla)** frontend.

> The frontend and backend logic were scaffolded with the help of **ChatGPT** to speed up development and improve structure.

---

##  Features

- User **Registration** and **Login** (Admin/User)
- **JWT-based Authentication**
- **Admin-only** Poll Creation
- **Public & Private** Polls
- **User Voting** with result view
- Polls **expire in 2 hours**
- **Protected Routes** using roles and tokens
- Simple and clean **HTML + JS Frontend**
- Basic **Role-Based Access Control**

---

##  Technologies Used

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (`jsonwebtoken`)  
- bcrypt  
- dotenv  
- CORS  
- nodemon  

### Frontend
- HTML  
- Vanilla JavaScript  

---

##  Authentication (JWT)

- Upon **login**, a JWT token is generated using `jsonwebtoken` and sent to the client.
- All **protected routes** (like `/createPoll`, `/vote/:id/:index`) must pass the token in the request **Authorization Header**.
- Role-based middleware ensures **admins** can create/edit/delete polls and **users** can vote/view results only.

---

##  AI Tool Usage (ChatGPT)

This project was enhanced using **ChatGPT** for:

- Some architectural ideas, backend practices were inspired by my previous projects in Git
- Implementing **JWT and role-based protection**
- Creating a simple and functional **frontend** (login, register, dashboard, vote)
- Improving error handling and UX
- Drafting this README file

---

##  Screen Recording

[[Add your Google Drive screen recording link here]](https://drive.google.com/file/d/10Q20J9e4poPfrKKtmo0kwAKLTVsAfG3m/view?usp=sharing)

---

##  Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/VidhunKr/polling_System_official
cd polling-backend
