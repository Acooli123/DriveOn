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
    ```

## GET /rides/get-fare

### Description
This endpoint calculates and returns the fare estimates for different vehicle types between a pickup location and a destination. It uses the Google Maps API to determine the distance and duration, then calculates fares based on vehicle-specific pricing.

### Request
- **Method**: GET
- **URL**: `/rides/get-fare`
- **Headers**: `Authorization: Bearer <token>` (required)
- **Query Parameters**:
  - `pickup` (string, required): The pickup location address. Must be at least 2 characters long.
  - `destination` (string, required): The destination address. Must be at least 2 characters long.

Example request URL:
```
GET /rides/get-fare?pickup=Central%20Park&destination=Times%20Square
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "bike": 45,
    "nonAcCar": 120,
    "acCar": 180,
    "shuttle": 85,
    "distance": "5.25",
    "duration": 15
  }
  ```

**Response Fields:**
- `bike` (integer): Estimated fare for a bike in the local currency.
- `nonAcCar` (integer): Estimated fare for a non-A/C car.
- `acCar` (integer): Estimated fare for an A/C car.
- `shuttle` (integer): Estimated fare for a shuttle.
- `distance` (string): Distance in kilometers.
- `duration` (integer): Estimated travel time in minutes.

#### Fare Calculation Details
The fare is calculated using the following formula for each vehicle type:

```
Total Fare = Base Fare + (Distance in km × Per km Rate) + (Duration in minutes × Per minute Rate)
```

The calculated fare is compared against the minimum fare, and the higher value is used.

**Fare Configuration:**

| Vehicle Type | Base Fare | Per Km Rate | Per Minute Rate | Minimum Fare |
|--------------|-----------|-------------|-----------------|---------------|
| Bike         | 20        | 8           | 1               | 30            |
| Non-A/C Car  | 50        | 18          | 3               | 100           |
| A/C Car      | 80        | 22          | 4               | 150           |
| Shuttle      | 40        | 10          | 1.5             | 60            |

#### Error Responses
- **Status Code**: 400 Bad Request (Validation Errors)
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Pickup is required",
          "param": "pickup",
          "location": "query"
        }
      ]
    }
    ```

- **Status Code**: 401 Unauthorized
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Failed to calculate fare",
      "error": "Error message here"
    }
    ```

## POST /captains/register

### Description
This endpoint allows registering a new captain by providing their details. The request must include valid captain information, including personal details and vehicle information. Upon successful registration, the captain data and an authentication token are returned.

### Request
- **Method**: POST
- **URL**: `/captains/register`
- **Content-Type**: `application/json`

#### Request Body
The request body must be a JSON object with the following fields:

- `fullName` (object, required):
  - `firstName` (string, required): The captain's first name. Must be at least 3 characters long.
  - `lastName` (string, required): The captain's last name. Must be at least 3 characters long.
- `email` (string, required): A valid email address. Must be unique.
- `password` (string, required): The captain's password. Must be at least 6 characters long.
- `vehicle` (object, required):
  - `color` (string, required): The vehicle color. Must be at least 3 characters long.
  - `licensePlate` (string, required): The vehicle license plate. Must be at least 3 characters long.
  - `capacity` (integer, required): The vehicle capacity. Must be at least 1.
  - `vehicleType` (string, required): The type of vehicle. Must be one of: "car A/C", "bike", "car non-A/C", "shuttle".
- `age` (integer, required): The captain's age.
- `experience` (integer, required): The captain's years of experience.

Example request body:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "licensePlate": "ABC123",
    "capacity": 4,
    "vehicleType": "car A/C"
  },
  "age": 30,
  "experience": 5
}
```

### Response

#### Success Response
- **Status Code**: 201 Created
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "message": "Captain created",
    "token": "jwt_token_here",
    "captain": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "licensePlate": "ABC123",
        "capacity": 4,
        "vehicleType": "car A/C"
      },
      "age": 30,
      "experience": 5
    }
  }
  ```

#### Error Responses
- **Status Code**: 400 Bad Request (Validation Errors or Captain Already Exists)
  - **Body** (Validation Errors):
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullName.firstName",
          "location": "body"
        }
      ]
    }
    ```
  - **Body** (Captain Already Exists):
    ```json
    {
      "error": "Captain already exists"
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Server error message"
    }
    ```

## GET /captains/profile

### Description
This endpoint retrieves the profile of the authenticated captain.

### Request
- **Method**: GET
- **URL**: `/captains/profile`
- **Headers**: `Authorization: Bearer <token>` (required)

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "captain": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "licensePlate": "ABC123",
        "capacity": 4,
        "vehicleType": "car A/C"
      },
      "age": 30,
      "experience": 5,
      "status": "available",
      "location": {
        "latitude": null,
        "longitude": null
      },
      "socketId": null
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
      "message": "Captain not found"
    }
    ```

- **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "message": "Server error"
    }
    ```

## GET /captains/logout

### Description
This endpoint logs out the authenticated captain by blacklisting the token, making it invalid for future requests.

### Request
- **Method**: GET
- **URL**: `/captains/logout`
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
      "message": "Server error message"
    }
    ```

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