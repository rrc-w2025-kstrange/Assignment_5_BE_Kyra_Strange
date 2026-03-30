## Helmet.js Configuration
### Configuration Applied

helmet({
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" }
});

### Justification
contentSecurityPolicy: false, Disabled because this API only serves JSON responses, not HTML. CSP is mainly for preventing XSS in web pages, so it is unnecessary here.
hidePoweredBy: true, Hides server technology info to reduce exposure to attackers.
noSniff: true, Prevents browsers from guessing the content type, which helps protect against some injection attacks.
hsts, Enforces HTTPS connections in production, ensuring data in transit is encrypted.
frameguard: deny, Blocks the API from being embedded in iframes, preventing clickjacking attacks.
referrerPolicy: no-referrer, Keeps request origins private by not sending the referrer header.
Sources
Helmet.js Official Documentation - https://helmetjs.github.io/
OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/

## CORS Configuration
### Configuration Applied
// Development: allow all origins for testing
{
  origin: true,
  credentials: true
}

// Production: restrict origins
{
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

### Justification
Development:  All origins allowed for ease of testing with tools like Postman or local frontends.
Production: Only trusted origins from environment variables are allowed to prevent unauthorized cross-origin requests.
Methods: Only supported HTTP methods are allowed, limiting the API's exposure to attacks.
Headers: Only essential headers are allowed, preventing unnecessary or potentially dangerous headers.
Credentials: Allowed for trusted origins to enable sending authentication tokens or service keys safely.
Sources
MDN Web Docs: Cross-Origin Resource Sharing (CORS) - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
OWASP CORS Security Guide - https://owasp.org/www-project-secure-headers/#cors