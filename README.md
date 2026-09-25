# Auth Service API

### POST /api/v1/auth/login

Authenticates a user into the platform.

Headers:
- Cookie: session_id=<session_token>

Request Body:

    {
      "username": "johndoe",
      "password": "secretpassword"
    }

Authentication Method: Stateful cookie-based authentication via Redis session store (Set-Cookie: session_id=...).

### GET /api/v1/users

Returns all active users.

Headers:
- Authorization: Bearer <access_token>

Response (200 OK):

Returns a raw array of user records:

    [
      { "id": "usr_101", "name": "Alice" },
      { "id": "usr_102", "name": "Bob" }
    ]
