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