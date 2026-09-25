# CloudVault API Documentation

Production documentation for CloudVault authentication, user accounts, and workspace subscriptions.

### POST /api/v1/auth/login
Authenticates an existing user account and establishes a session.

Request body declares field username.
Request body declares field password.

Authentication Method: Stateful cookie-based authentication via Redis session store (Set-Cookie: session_id=...).

Response (200 OK):
Returns session confirmation with user authentication status.

### POST /api/v1/users/register
Registers a new developer user profile.

Request body declares field username.
Request body declares field full_name.
Request body declares field age.
Request body declares field role.

Response (201 Created):
Returns success status for created user.

### GET /api/v1/users
Retrieves the list of active team members.

Headers:
- Authorization: Bearer token

Response (200 OK):
Returns a raw array of user records: [{ id, name }, ...]

### POST /api/v1/billing/subscriptions
Creates a new enterprise workspace tier.

Request body declares field plan_id.
Request body declares field seats.

Authentication Method: Stateful cookie-based authentication via Redis session store (Set-Cookie: session_id=...).

Response (200 OK):
Returns subscription identifier and active status.

### GET /api/v1/health
System health check probe.

Response (200 OK):
Returns status ok.
