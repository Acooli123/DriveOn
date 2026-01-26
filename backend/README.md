# API Documentation

## POST /users/register

### Description
This endpoint allows registering a new user by providing their details. The request must include valid user information, and upon successful registration, the user data is returned.

### Request
- **Method**: POST
- **URL**: `/users/register`
- **Content-Type**: `application/json`

#### Request Body
The request body must be a JSON object with the following fields:

- `fullname` (object, required):
  - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. If provided, must be at least 3 characters long.
- `email` (string, required): A valid email address. Must be unique.
- `password` (string, required): The user's password. Must be at least 6 characters long.

Example request body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response
- **Status Code**: 201 Created
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "message": "User registered successfully",
    "data": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "password123"
    }
  }
  ```

#### Error Responses
- **Status Code**: 400 Bad Request (Validation Errors)
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Server error"
    }

## GET /users/profile

### Description
This endpoint retrieves the profile of the authenticated user.

### Request
- **Method**: GET
- **URL**: `/users/profile`
- **Headers**: `Authorization: Bearer <token>` (required)

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Error Responses
- **Status Code**: 401 Unauthorized
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **Status Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "message": "User not found"
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Server error"
    }

## GET /users/logout

### Description
This endpoint logs out the authenticated user by blacklisting the token.

### Request
- **Method**: GET
- **URL**: `/users/logout`
- **Headers**: `Authorization: Bearer <token>` (required)

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Error Responses
- **Status Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "message": "No token"
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Server error"
    }

## POST /users/login

### Description
This endpoint allows an existing user to log in by providing their email and password. Upon successful authentication, a JWT token is returned along with the user data.

### Request
- **Method**: POST
- **URL**: `/users/login`
- **Content-Type**: `application/json`

#### Request Body
The request body must be a JSON object with the following fields:

- `email` (string, required): A valid email address.
- `password` (string, required): The user's password. Must be at least 6 characters long.

Example request body:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Error Responses
- **Status Code**: 400 Bad Request (Validation Errors)
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email address",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **Status Code**: 401 Unauthorized
  - **Body**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Server error"
    }