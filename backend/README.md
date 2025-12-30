# Backend - Task Management API

RESTful API for task management system with JWT authentication.

## Setup
```bash
npm install
```

Create `.env`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_secret_key
```

## Scripts
```bash
npm run dev      # Development with nodemon
npm start        # Production
npm run seed     # Populate test data
```

## Folder Structure
```
backend/
├── controllers/
│   ├── authController.js      # Authentication logic (register, login)
│   └── taskController.js       # Task CRUD operations
├── models/
│   ├── User.js                 # User schema and model
│   └── Task.js                 # Task schema and model
├── routes/
│   ├── authRoutes.js           # Authentication routes
│   └── taskRoutes.js           # Task routes
├── middleware/
│   └── auth.js                 # JWT authentication middleware
├── .env                        # Environment variables (not in git)
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies and scripts
├── server.js                   # Express server entry point
├── seed.js                     # Database seeding script
└── README.md                   # Backend documentation
```

## API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }
```

**Login User**
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Task Endpoints (Protected)

All task endpoints require `Authorization: Bearer <token>` header.

**Get All Tasks**
```
GET /api/tasks?page=1&limit=10
Response: { tasks, currentPage, totalPages, totalTasks }
```

**Get Single Task**
```
GET /api/tasks/:id
Response: { task }
```

**Create Task**
```
POST /api/tasks
Body: { title, description, dueDate, priority }
Response: { task }
```

**Update Task**
```
PUT /api/tasks/:id
Body: { title?, description?, dueDate?, priority?, status? }
Response: { task }
```

**Delete Task**
```
DELETE /api/tasks/:id
Response: { message }
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: 'user'),
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  dueDate: Date,
  status: String (pending/completed),
  priority: String (high/medium/low),
  assignedTo: ObjectId (ref: User),
  timestamps: true
}
```

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment variables
- cors - CORS middleware