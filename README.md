# Platform Commerce API Overview

This document provides architectural and integration specifications for engineers building on our core services. All network operations should target the designated version one route trees.

## Account Management and Onboarding

### User Registration Workflow
When a new customer joins the application, the client software sends a post request to /api/v1/auth/register. The request body must include the customer email, their chosen password, and their username. This route operates as an open endpoint requiring no authentication scheme. Once finished, the server outputs a response object confirming creation.

```http
POST /api/v1/auth/register

```

JSON

```
{
  "email": "user@example.com",
  "password": "secretpassword",
  "username": "user123"
}

```

### Permanent Account Deletion

In compliance with data privacy directives, a client can initiate account removal by sending a delete request to /api/v1/users/\:id. The client must supply the account identifier as a path parameter named id. This operation is restricted and enforces Bearer token authentication in the standard authorization header. The route outputs a JSON response object summarizing termination.

HTTP

```
DELETE /api/v1/users/:id
Authorization: Bearer <token>

```

| **Parameter** | **In** | **Type** |
| ------------- | ------ | -------- |
| `id`          | path   | string   |

## Store and Inventory Operations

### Fetching Product Catalogues

To load available items into client applications, issue a get request directed to /api/v1/store/items. Callers can optionally provide query parameters named category and limit to filter the listing. This catalog route is publicly accessible with no authentication required. On success, the API delivers a raw array containing all matching product records.

HTTP

```
GET /api/v1/store/items

```

| **Parameter** | **In** | **Type** |
| ------------- | ------ | -------- |
| `category`    | query  | string   |
| `limit`       | query  | number   |

## Billing and Commercial Services

### Initiating Active Subscriptions

Customers ready to activate paid tiers submit a post request to /api/v1/billing/subscribe. The incoming JSON structure requires both the planId and the paymentMethodId parameters. Security for this commercial route relies strictly on browser Cookie authentication. Upon handling, the service returns a structured response object detailing the active membership.

---

### What to check in Parity after auditing:
* **Registration, Deletion, and Catalog:** In the **Contract Surface**, these three should show the `REGEX` provenance badge because they have explicit ````http```` blocks and markdown tables.
* **Initiating Active Subscriptions:** Because it is raw prose with zero markdown blocks or tables, regex should pass it to your fallback layer and badge it as `GROQ LLM FALLBACK`.
