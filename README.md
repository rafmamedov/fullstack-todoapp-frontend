# MERN Drag-and-Drop Task Board

This project is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with TypeScript. The application allows users to manage task boards with columns for tasks categorized as "ToDo", "In Progress", and "Done". Users can interact with these boards, create/update/delete tasks, and use drag-and-drop functionality to manage task cards within the columns.

## Demo:
Check out the live demo of this project [here](https://taskmanager-lvey.onrender.com)

## Technologies Used:
- **Frontend**:
  - React.js
  - TypeScript
  - SCSS (for custom styling)
  - Bulma (for responsive design and layout)
  - React Hook Form (for form management)
  - React DnD (for drag-and-drop functionality)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for data storage)

## Features Implemented:
- **Board Management**:
  - Use the header input to create new boards or load created one with saved tasks.
  - Each board is uniquely identified by a hashed ID and contains predefined columns: "ToDo", "In Progress", "Done".

- **Task Management**:
  - Users can add, update, and delete tasks (represented as cards) within each board.
  - Each task card includes a title and description.

- **Drag-and-Drop Functionality**:
  - Task cards can be moved between columns ("ToDo", "In Progress", "Done") using drag-and-drop gestures.
  - Users can also change the order of cards within a column by dragging them to a new position.

## Setup Instructions:
1. Clone the repository from GitHub.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install`.
6. Start the frontend development server using `npm start`.
7. Access the application in your web browser at `http://localhost:3000`.
