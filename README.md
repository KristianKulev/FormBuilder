# React Redux Transactions App

This project is a single page application using the following technologies:

- React for the frontend.
- Redux for state management.
- React Router for navigation.
- Tailwind CSS for styling.
- Axios for making API requests.
- Express server for handling API requests and providing mock data.

## Installation

1. Install dependencies for the client in the root folder:

   ```
   npm install
   ```

2. Install dependencies for the server:
   ```
   cd server
   npm install
   ```

## Running the Application

1. Start the server:

   ```
   cd server
   npm start
   ```

   The server will start on `http://localhost:5000`.

2. Start the client in the root folder:

   ```
   npm start
   ```

   The client will start on `http://localhost:3000`.

## API Endpoints

### POST /form-builder/multiselect

Posts the details of a newly defined multiselect type. The DTO is saved in a local file in `server\database\formBuilderDB.json`

## Available Scripts

### Client

- `npm start`: Runs the app in the development mode.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

### Server

- `npm start`: Starts the Express server.
