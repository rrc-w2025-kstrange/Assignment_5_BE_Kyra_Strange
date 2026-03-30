# Assignment 5 — Events REST API

A RESTful API for managing events, built with Node.js, Express, and TypeScript. It provides full CRUD functionality for event resources, allowing clients to create, retrieve, update, and delete events with built-in request validation and structured error responses.

This API solves the need for a reliable, validated backend service for event management applications. It enforces data integrity through schema validation on every request, ensuring that only well-formed data reaches the business logic layer.

It is intended for developers building front-end applications or integrations that need a clean, documented events data layer. Whether you are prototyping a scheduling tool or learning RESTful API design patterns, this project provides a solid, well-structured starting point.

---

## Table of Contents

- [Installation Instructions](#installation-instructions)
- [API Request Examples](#api-request-examples)
- [Public API Documentation](#public-api-documentation)
- [Local Documentation Access](#local-documentation-access)

---

## Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v22.21.1 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/rrc-w2025-kstrange/Assignment_5_BE_Kyra_Strange.git
cd Assignment_5_BE_Kyra_Strange
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and fill in your values:
```bash
cp .env.example .env
```

Open `.env` and configure the following variables:
```env
PORT=3000
```

> `PORT` — The port the server will listen on. Defaults to `3000` if not set.

4. **Build the TypeScript source**
```bash
npm run build
```

5. **Start the server**
```bash
npm run start
```

The server will be running at `http://localhost:3000`.

---

## API Request Examples

### 1. Health Check

Verify that the server is running and responsive.

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Response `200 OK`:**
```json
{
  "status": "OK",
  "uptime": 42.3,
  "timestamp": "2026-03-29T12:00:00.000Z",
  "version": "1.0.0"
}
```

---

### 2. Create an Event

Create a new event by providing a name, date, capacity, and optional fields.

**Request:**
```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference",
    "date": "2026-06-01T10:00:00Z",
    "capacity": 100,
    "status": "active",
    "category": "conference"
  }'
```

**Response `201 Created`:**
```json
{
  "message": "Event created",
  "data": {
    "id": "evt_001",
    "name": "Tech Conference",
    "date": "2026-06-01T10:00:00.000Z",
    "capacity": 100,
    "registrationCount": 0,
    "status": "active",
    "category": "conference"
  }
}
```

**Response `400 Bad Request` (validation failure):**
```json
{
  "message": "Validation error: \"capacity\" must be greater than or equal to 5"
}
```

---

### 3. Get All Events

Retrieve a list of all events.

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/events
```

**Response `200 OK`:**
```json
{
  "message": "Events retrieved",
  "count": 2,
  "data": [
    {
      "id": "evt_001",
      "name": "Tech Conference",
      "date": "2026-06-01T10:00:00.000Z",
      "capacity": 100,
      "registrationCount": 0,
      "status": "active",
      "category": "conference"
    },
    {
      "id": "evt_002",
      "name": "Design Workshop",
      "date": "2026-07-15T09:00:00.000Z",
      "capacity": 30,
      "registrationCount": 5,
      "status": "active",
      "category": "workshop"
    }
  ]
}
```

---

### 4. Get a Single Event by ID

Retrieve a specific event by its unique ID.

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/events/evt_001
```

**Response `200 OK`:**
```json
{
  "id": "evt_001",
  "name": "Tech Conference",
  "date": "2026-06-01T10:00:00.000Z",
  "capacity": 100,
  "registrationCount": 0,
  "status": "active",
  "category": "conference"
}
```

**Response `404 Not Found`:**
```json
{
  "message": "Event not found"
}
```

---

### 5. Update an Event

Update one or more fields of an existing event. At least one field is required.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/v1/events/evt_001 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Tech Conference",
    "capacity": 120
  }'
```

**Response `200 OK`:**
```json
{
  "id": "evt_001",
  "name": "Updated Tech Conference",
  "date": "2026-06-01T10:00:00.000Z",
  "capacity": 120,
  "registrationCount": 0,
  "status": "active",
  "category": "conference"
}
```

---

### 6. Delete an Event

Remove an event by its unique ID.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/v1/events/evt_001
```

**Response `200 OK`:**
```json
{
  "message": "Entity evt_001 was deleted"
}
```

**Response `404 Not Found`:**
```json
{
  "message": "Event not found"
}
```

---

## Public API Documentation

Full interactive API documentation (OpenAPI / Swagger UI) is available at:

**[https://rrc-w2025-kstrange.github.io/Assignment_5_BE_Kyra_Strange/](https://rrc-w2025-kstrange.github.io/Assignment_5_BE_Kyra_Strange/)**

---

## Local Documentation Access

When running the server locally, you can access the Swagger UI at:
http://localhost:3000/api-docs

This provides an interactive interface where you can read endpoint descriptions, view request/response schemas, and test API calls directly from your browser.