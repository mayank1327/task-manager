# Frontend - Task Management Interface

React-based frontend for task management system.

## Setup
```bash
npm install
npm run dev
```

## Features

- User authentication (login/register)
- Task list with pagination
- Task create/edit forms
- Task details view
- Priority board (kanban)
- Status toggling
- Responsive design

## Technologies

- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

## Project Structure
```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── TaskList.jsx
│   ├── TaskForm.jsx
│   ├── TaskDetails.jsx
│   └── PriorityBoard.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   └── api.js
└── App.jsx
```

## Configuration

Update API base URL in `src/services/api.js` if needed:
```javascript
baseURL: 'http://localhost:3000/api'
```

## Build for Production
```bash
npm run build
```

Output in `dist/` folder.
```

---

## **Step 4: Create .gitignore**

Create `.gitignore` in root:
```
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Build output
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*