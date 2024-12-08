# InStock - Inventory Management System

## Project Overview

InStock is a full-stack web application designed to address the scalability and performance challenges of an existing inventory management system for a Fortune 500 client. This project was developed collaboratively by a team of skilled engineers following Agile Scrum practices. The system provides efficient inventory and warehouse management capabilities, ensuring a seamless experience for users.

### Features:

- **Inventory Management**: Add, edit, delete, and view inventory items effortlessly.
- **Warehouse Management**: Manage and track detailed warehouse information.
- **Responsive Design**: Optimized for a seamless user experience across all devices.
- **Robust Back-End**: Developed using Node.js and Express, with MySQL database integration.
- **Modern Front-End**: Built with React and React Router for smooth navigation and user interaction.

---

## Repository Links

- [Client Repository](https://github.com/betty-alemayehu/InStock/)
- [Server Repository](https://github.com/betty-alemayehu/InStock-Database/)

---

## Tools and Technologies

### Development
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  ![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)  ![Knex.js](https://img.shields.io/badge/Knex.js-EF5B25?style=for-the-badge&logoColor=white)  

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

### Collaboration
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)  ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)  ![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)

### Design
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### Methodology
**Development Approach**: Agile Scrum

---

## Team and Contributions

### Betty Alemayehu ([GitHub Profile](https://github.com/betty-alemayehu))
- Implemented warehouse add and edit pages to dynamically render from a single component.
- Built animations for improved user experience.
- Optimized search functionality for inventory and warehouse data.

### Ifechukwu Onuorah ([GitHub Profile](https://github.com/ifechukwu123))
- Developed APIs for inventory CRUD operations using Node.js and Express.
- Integrated navigation and routing with React Router.
- Conducted unit testing of back-end routes with Postman.

### Nicolette Cheng ([GitHub Profile](https://github.com/nicolette-cheng))
- Designed and implemented responsive header and footer components.
- Collaborated on front-end testing and resolved bugs.

### Michelle Watson ([GitHub Profile](https://github.com/Michelle-Watson))
- Handled error boundaries and fallback UI for unmatched routes.
- Designed and set up the database schema using MySQL and Knex.js.

---

## Key Tasks Completed

### Backend Development
- Built CRUD APIs for inventory and warehouse data management.
- Integrated MySQL database with Knex.js for efficient data operations.

### Frontend Development
- Created responsive layouts adhering to Figma mockups.
- Developed modular components for scalability and maintainability.

### UX Enhancements
- Added animations to enhance user experience.
- Optimized search functionality for better usability.

### Project Management
- Used Git Flow for branch management and pull requests.
- Reviewed and resolved merge conflicts efficiently.

---

## Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [MySQL](https://www.mysql.com/) (v8.0 or later)
- npm (comes with Node.js)
- Git

### Setup

1. **Clone the Repositories**:
   ```bash
   git clone https://github.com/betty-alemayehu/InStock.git
   git clone https://github.com/betty-alemayehu/InStock-Database.git

2. **Backend Setup**:
   - Navigate to the server directory:
     ```bash
     cd InStock-Database
     npm install
     ```

   - Create a `.env` file and configure the following:
     ```env
     DB_HOST=your-database-host
     DB_USER=your-database-username
     DB_PASS=your-database-password
     DB_NAME=your-database-name
     ```

   - Run migrations and seed the database:
     ```bash
     npx knex migrate:latest
     npx knex seed:run
     ```

   - Start the development server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the client directory:
     ```bash
     cd InStock
     npm install
     ```

   - Start the development server:
     ```bash
     npm run dev
     ```

