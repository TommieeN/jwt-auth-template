# JWT Authentication Server

This repository hosts a JWT (JSON Web Tokens) authentication server, built using Node.js, Express.js, Knex.js, and bcrypt.js. It offers essential features for user registration, login, and authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with secure, hashed password storage.
- User login with JWT token issuance.
- Authentication middleware to safeguard routes.
- Safely manage sensitive data, including the JWT secret key.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- **Node.js and npm:** Make sure Node.js and npm are installed on your system.
- **Database Server:** Set up a MySQL or another compatible database server.
- **Environment Variables:** Familiarity with configuring environment variables for server configuration.

## Getting Started

To launch the server locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/jwt-authentication-server.git
   ```

2. cd jwt-authentication-server

```bash
    npm install

```

3.Set up environment variables: Create a .env file in the project root and define these variables:

```bash
    PORT=8080
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret_key
```

4.

```bash
npm start
```

## Usage

To interact with the JWT Authentication Server, you can use HTTP client tools or libraries like `curl`, `axios`, or any API testing tool like Postman or Insomnia. Here's a basic example of how to register a new user, log in, and make an authenticated request:

### Register a New User

```bash
curl -X POST http://localhost:8080/api/users/register -H "Content-Type: application/json" -d '{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "your_secure_password"
}'
```
### Login with User

```bash
curl -X POST http://localhost:8080/api/users/login -H "Content-Type: application/json" -d '{
  "email": "johndoe@example.com",
  "password": "your_secure_password"
}'
```

You'll receive a JSON response containing a JWT token. You can use this token for authenticated requests.

### Make an Authenticated Request
Replace <JWT_TOKEN_HERE> with the JWT token obtained from the login step:

```bash
curl -X GET http://localhost:8080/api/users/current -H "Authorization: Bearer <JWT_TOKEN_HERE>"
```

This will retrieve information about the currently authenticated user.

Feel free to adapt and expand this section with specific examples and explanations relevant to your server's use cases.
```
