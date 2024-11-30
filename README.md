## Setup

1. Go to the directory where the `docker-compose.yaml` file is present.
2. Run the following command to build the Docker containers:

   ```bash
    docker-compose build
    docker-compose up
   ```

All required credentials, including the MongoDB Atlas URL and JWT secret, are already included in the `docker-compose.yaml` file. So there is **no need to set up environment variables** manually.

> **Note:**  
> This is temporary, and the history will be rewritten later.

## Endpoints

### 1. **User Authentication**

| Endpoint           | Method | Request Body                                        | Response       | Description                                                    |
| ------------------ | ------ | --------------------------------------------------- | -------------- | -------------------------------------------------------------- |
| `/api/user/signup` | POST   | `{ fullName, userName, password, email }` (in JSON) | `{ jwtToken }` | Creates a new user and returns a JWT token for authentication. |
| `/api/user/signin` | POST   | `{ userName, password }` (in JSON)                  | `{ jwtToken }` | Authenticates the user and returns a JWT token.                |

### 2. **Task Management**

| Endpoint                   | Method | Request Body                                        | Response          | Description                                                                                                                                    |
| -------------------------- | ------ | --------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/task/todo`           | POST   | `{ title, description, dueDate, status }` (in JSON) | `{ todo }`        | Creates a new todo. `createdAt` and `updatedAt` are automatically handled by Mongoose. Requires `Authorization` header with a valid JWT token. |
| `/api/task/todos/<todoID>` | GET    | `Authorization: Bearer <valid token>`               | `{ todo }`        | Retrieves a specific todo by its ID. Requires `Authorization` header with a valid JWT token.                                                   |
| `/api/task/todo/<todoID>`  | DELETE | `Authorization: Bearer <valid token>`               | `{ message }`     | Deletes a specific todo by its ID. Requires `Authorization` header with a valid JWT token.                                                     |
| `/api/task/todo/<todoID>`  | PUT    | `{ title, description, dueDate, status }` (in JSON) | `{ updatedTodo }` | Updates a specific todo by its ID. Requires `Authorization` header with a valid JWT token.                                                     |

## Authentication

For most API endpoints, authentication is required via a JWT token. You must include the token in the `Authorization` header of your request as follows:

Authorization: Bearer <valid token>

## Example Usage

### 1. Sign Up

Request:

```bash
POST /api/user/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "userName": "johndoe",
  "password": "password123"
  "email": "abc@email.com"
}

```

## Things Left to Do

1. Fix Bug in Completed route.
2. Proper Error Handling in Frontend.
3. Add Pagination.
