Cryptocurrency-dashboard 

# Admin & User Role-Based Dashboard 

  

This project is a role-based web application built with React for the frontend and Node.js for the backend. It serves two primary roles: **Admin** and **User**, each with distinct functionalities. 

  

## Features 

  

### Admin Dashboard 

- View a list of all registered users, including their details (name, email, and role). 

- Delete users to maintain the integrity of the system. 

- Change user roles (toggle between admin and user). 

  

### User Dashboard 

- View and explore cryptocurrency prices fetched from an external API (e.g., CoinGecko). 

- Add cryptocurrencies to a **Favorites List** for personalized tracking. 

- Remove cryptocurrencies from the **Favorites List**. 

  

### Authentication & Authorization 

- Secure login using **JWT (JSON Web Tokens)**. 

- Role-based access control ensures admins and users see their specific dashboards. 

  

--- 

  

## Tech Stack 

  

### Frontend: 

- React 

- React Router 

- Bootstrap (React-Bootstrap) 

  

### Backend: 

- Node.js 

- Express.js 

- JSON Web Token (JWT) for authentication 

  

### Database: 

- MongoDB (for user data storage) 

  

--- 

  

## Installation 

  

Follow these steps to set up and run the project locally: 

  

### Prerequisites 

- Node.js (v14 or higher) 

- MongoDB installed and running locally or a MongoDB Atlas instance 

- Git installed 

  

### Steps 

  

1. **extract the zip folder**: 

   

2. **Backend Setup**: 

   Navigate to the backend directory: 

   ```bash 

   cd backend 

   ``` 

  

   Install dependencies: 

   ```bash 

   npm install 

   ``` 

  

   Create a `.env` file and configure the following variables: 

   ```env 

   PORT=5000 

   MONGO_URI=your_mongodb_connection_string 

   SECRET_KEY=your_jwt_secret_key 

   ``` 

  

   Start the backend server: 

   ```bash 

   npm start 

   ``` 

  

3. **Frontend Setup**: 

   Navigate to the frontend directory: 

   ```bash 

   cd ../jwt-react 

   ``` 

  

   Install dependencies: 

   ```bash 

   npm install 

   ``` 

  

   Start the frontend development server: 

   ```bash 

   npm start 

   ``` 

  

4. **Access the Application**: 

   - Open your browser and navigate to `http://localhost:3000` to view the application. 

   - Ensure the backend server is running on `http://localhost:5000`. 

  

## Usage 

  

### Admin Actions 

1. **Login as Admin**: 

   - Use credentials for an admin user. 

   - Access the Admin Dashboard. 

2. **Manage Users**: 

   - View the list of all users. 

   - Delete a user by clicking the "Delete" button. 

   - Change a user's role by clicking the "Change Role" button. 

  

### User Actions 

1. **Login as User**: 

   - Use credentials for a regular user. 

   - Access the User Dashboard. 

2. **Manage Favorites**: 

   - Explore cryptocurrency prices. 

   - Add cryptocurrencies to your Favorites List. 

   - Remove cryptocurrencies from the Favorites List. 

  

--- 

  

## API Endpoints 

  

### Authentication 

- `POST /api/auth/login`: Login and receive a JWT. 

  

### Admin Endpoints 

- `GET /api/users`: Fetch all users. 

- `DELETE /api/user/:id`: Delete a user by ID. 

- `PUT /api/user/role`: Update a user's role. 

  

### User Endpoints 

- `GET /api/cryptos`: Fetch cryptocurrency data. 

  

--- 

  

## Folder Structure 

``` 

admin-user-dashboard/ 

├── src 

│   ├── controllers/ 

│   ├── models/ 

│   ├── routes/ 

│   ├── configuration/ 

│   └── server.js 

├── frontend/ 

│   ├── public/ 

│   ├── src/ 

│   │   ├── components/ 

│   │   ├── pages/ 

│   │   ├── App.js 

│   │   └── index.js 

├── .gitignore 

├── README.md 

└── package.json 

``` 

  

--- 

  



 
