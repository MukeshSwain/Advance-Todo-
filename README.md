# MERN Todo Application

A full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js) with authentication and CRUD functionalities.

## Features
- User authentication (JWT-based login & registration)
- CRUD operations for todos
- Mark todos as completed
- Email notifications (Nodemailer)
- Automated tasks (Node-Cron)
- Responsive UI with React
- Secure API with Express and MongoDB

## Tech Stack
- **Frontend:** React, Context API, Axios, Tailwind CSS, shadcn
- **Backend:** Node.js, Express, MongoDB, JWT, Nodemailer, Node-Cron
- **Database:** MongoDB Atlas
- **Deployment:** Frontend on Vercel, Backend on vercel

## Setup
### Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Install dependencies:
   ```bash
   npm install or npm install --force
   ```
2. Configure `./constant/api_end_point.js` file:
   ```env
   autEndPoint = "http://localhost:5001/api/user";
   taskEndPoint = "http://localhost:5001/api/task";

   ```
3. Start the app:
   ```bash
   npm run build
   ```

## Usage
- Register or log in
- Manage todos (add, edit, delete, complete)
- Receive email notifications
- Automated cron jobs for tasks

## Deployment
- **Live App:** https://advance-todo-eight.vercel.app


## Contributing
Feel free to submit pull requests.

## License
ISC License

---
**Author:** Mukesh Swain




