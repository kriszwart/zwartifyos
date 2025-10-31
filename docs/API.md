# ZwartifyOS API Documentation

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [POST /api/agent](#post-apiagent)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## Overview

The ZwartifyOS API provides endpoints for interacting with Claude AI agents. All requests must be authenticated and are subject to rate limiting.

**Base URL**: `https://yourdomain.com` (or `http://localhost:3000` for development)

**Content-Type**: `application/json`

---

## Authentication

### API Token

All API requests require authentication via Bearer token.

**Header Format**:
```
Authorization: Bearer YOUR_API_TOKEN
```

### Setup

1. Generate a secure token:
   ```bash
   openssl rand -hex 32
   ```

2. Add to `.env.local`:
   ```env
   API_AUTH_TOKEN=your_generated_token_here
   ```

3. Include in all requests:
   ```bash
   curl -H "Authorization: Bearer your_generated_token_here" \
        https://yourdomain.com/api/agent
   ```

### Development Mode

If `API_AUTH_TOKEN` is not set, authentication is disabled (development only).

**⚠️ Never deploy to production without setting API_AUTH_TOKEN!**

---

## Rate Limiting

Requests are rate-limited per IP address to prevent abuse.

### Default Limits

- **10 requests per minute** per IP
- Configurable via environment variables

### Configuration

Set in `.env.local`:
```env
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

### Response Headers

All responses include rate limit headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |

### Rate Limit Exceeded

**Status**: `429 Too Many Requests`

**Response**:
```json
{
  "error": "Rate limit exceeded. Please try again later.",
  "retryAfter": 45
}
```

**Headers**:
```
Retry-After: 45
```

---

## Endpoints

### POST /api/agent

Execute an AI agent with provided input.

#### Request

**URL**: `/api/agent`

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN
```

**Body**:
```json
{
  "input": "Your prompt or question here"
}
```

**Parameters**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `input` | string | Yes | The prompt/question for the agent (max 10,000 characters) |

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "text": "Agent response text here"
}
```

**Headers**:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1234567890
```

#### Example

**Request**:
```bash
curl -X POST https://yourdomain.com/api/agent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_token" \
  -d '{
    "input": "What is the capital of France?"
  }'
```

**Response**:
```json
{
  "text": "The capital of France is Paris."
}
```

---

## Error Handling

### Error Response Format

All errors return a JSON object with an `error` field:

```json
{
  "error": "Error message description"
}
```

### Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful |
| `400` | Bad Request | Invalid input or malformed request |
| `401` | Unauthorized | Missing or invalid API token |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server error occurred |
| `504` | Gateway Timeout | Request took longer than 2 minutes |

### Common Errors

#### 400 Bad Request

**Invalid Input Type**:
```json
{
  "error": "Input must be a string"
}
```

**Empty Input**:
```json
{
  "error": "Input cannot be empty"
}
```

**Input Too Long**:
```json
{
  "error": "Input exceeds maximum length of 10000 characters"
}
```

**Suspicious Content**:
```json
{
  "error": "Input contains suspicious content"
}
```

**Invalid JSON**:
```json
{
  "error": "Invalid JSON in request body"
}
```

#### 401 Unauthorized

```json
{
  "error": "Unauthorized: Invalid or missing API token"
}
```

#### 504 Gateway Timeout

```json
{
  "error": "Request timeout: Agent took too long to respond"
}
```

---

## Examples

### JavaScript/TypeScript

```typescript
async function callAgent(input: string) {
  const response = await fetch('https://yourdomain.com/api/agent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ input }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  const data = await response.json()
  return data.text
}

// Usage
try {
  const result = await callAgent('Hello, how are you?')
  console.log(result)
} catch (error) {
  console.error('Error:', error.message)
}
```

### Python

```python
import requests
import os

def call_agent(input_text):
    url = 'https://yourdomain.com/api/agent'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.getenv("API_AUTH_TOKEN")}'
    }
    data = {'input': input_text}

    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()

    return response.json()['text']

# Usage
try:
    result = call_agent('Hello, how are you?')
    print(result)
except requests.exceptions.HTTPError as e:
    print(f'Error: {e.response.json()["error"]}')
```

### cURL

```bash
#!/bin/bash

API_TOKEN="your_api_token_here"
INPUT="What is the capital of France?"

curl -X POST https://yourdomain.com/api/agent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d "{\"input\": \"$INPUT\"}" \
  | jq .
```

---

## Security Best Practices

1. **Never commit API tokens** to version control
2. **Use HTTPS** in production
3. **Rotate tokens regularly**
4. **Monitor rate limit** headers to avoid throttling
5. **Validate responses** before using in your application
6. **Handle errors gracefully** with proper error messages
7. **Set appropriate timeouts** for requests

---

## Support

For issues or questions:
- [GitHub Issues](https://github.com/kriszwart/zwartifyos/issues)
- [Documentation](https://github.com/kriszwart/zwartifyos)

---

## Changelog

### v0.1.0 (2025-10-31)
- Initial API release
- Authentication via Bearer token
- Rate limiting per IP
- Input validation and sanitization
- Request timeout handling
