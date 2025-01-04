# Taskco - Task Management Application

Taskco is a beautiful and intuitive task management application designed to help you organize your tasks efficiently. With Taskco, you can create, update, and manage tasks with ease. Whether you're tracking personal to-dos or managing team projects, Taskco has you covered.

## Features

- **Add New Tasks:** Create tasks with a title, description, priority, due date, and completion status.
- **Edit Tasks:** Update existing tasks to reflect changes in priority, due date, or completion status.
- **Mark Tasks as Completed:** Easily toggle the completion status of tasks.
- **Filter Tasks:** View tasks by status (All, Completed, Pending, Overdue).
- **Responsive Design:** Taskco works seamlessly on desktop and mobile devices.
- **User Authentication:** Log in or register to manage your tasks securely.
- **Social Media Integration:** Connect with us on GitHub, Instagram, and Facebook.

## Technologies Used

**Frontend:**
- React.js
- Tailwind CSS (for styling)
- Lucide Icons (for icons)
- React Router (for routing)
- React Hot Toast (for notifications)

**Backend:**
- Node.js
- Express.js
- MongoDB (for database)

**Authentication:**
- JWT (JSON Web Tokens)

**Deployment:**
- Vercel (Frontend)
- Render (Backend)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (for local development)

### Steps



Usage
Home Page

View all your tasks in one place.
Use the navigation icons to filter tasks by status (All, Completed, Pending, Overdue).
Add a New Task

Click the "Add a new Task" button.
Fill in the task details (title, description, priority, due date, and completion status).
Click "Add Task" to save.
Edit a Task

Click the Edit icon on any task.
Update the task details in the modal.
Click "Update Task" to save changes.
Mark a Task as Completed

Toggle the Completed checkbox in the task modal.
Delete a Task

Click the Delete icon on any task to remove it.
User Authentication

Log in or register to access your tasks.
Securely manage your tasks with JWT-based authentication.
Screenshots
Home Page
Task Modal
Filtered Tasks
Contributing
We welcome contributions! If you'd like to contribute to Taskco, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeatureName).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeatureName).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Connect with Us
GitHub: aadityabinod/taskmanager
Instagram: @aadityarayyadav
Facebook: Aaditya Binod Yadav
Email: aadityarayyadav@gmail.com
Acknowledgments
Special thanks to Lucide Icons for the beautiful icons.
Thanks to the React and Tailwind CSS communities for their amazing tools and resources.



#### Clone the Repository:

```bash
git clone https://github.com/aadityabinod/taskmanager.git
cd taskmanager
Install Dependencies:
Frontend:

bash
cd client
npm install
Backend:

bash
cd server
npm install
Set Up Environment Variables:
Create a .env file in the server directory and add the following:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Run the Application:
Start the backend server:

bash
cd server
npm start
Start the frontend development server:

bash
cd client
npm start
Access the Application:
Open your browser and navigate to http://localhost:3000.
