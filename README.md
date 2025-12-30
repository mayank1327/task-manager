# Task Management System

A full-stack task management application built with MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, priority-based task organization, and a kanban-style board.

## Features

- **User Authentication** - Secure JWT-based authentication
- **Task Management** - Create, read, update, and delete tasks
- **Priority System** - Organize tasks by High, Medium, and Low priority
- **Status Tracking** - Mark tasks as Pending or Completed
- **Priority Board** - Kanban-style board for visual task organization
- **Pagination** - Efficient task list navigation
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

**Frontend:**
- React.js (Vite)
- React Router
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_jwt_secret_key
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Usage

### Create Test Data
```bash
cd backend
npm run seed
```

This creates 3 users with 8-15 tasks each. All passwords: `password123`

Test accounts:
- alice@example.com
- bob@example.com
- charlie@example.com

### Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure
```
task-manager/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks (with pagination)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## License

MIT

## Author

Mayank Mehta