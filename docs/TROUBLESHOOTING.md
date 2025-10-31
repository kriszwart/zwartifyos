# Troubleshooting Guide

Common issues and their solutions for ZwartifyOS.

## Table of Contents

- [Installation Issues](#installation-issues)
- [API Issues](#api-issues)
- [Agent Issues](#agent-issues)
- [Tool Issues](#tool-issues)
- [Deployment Issues](#deployment-issues)
- [Testing Issues](#testing-issues)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### npm install fails with peer dependency errors

**Symptom**: Installation fails with peer dependency conflicts

**Solution**:
```bash
npm install --legacy-peer-deps
```

**Why**: The Claude Agent SDK may have peer dependency version requirements that conflict with Next.js

---

### TypeScript errors after installation

**Symptom**: TypeScript errors about missing types

**Solution**:
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

---

### Missing environment variables warning

**Symptom**: Warnings about missing `.env.local` file

**Solution**:
1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```
2. Add your actual API keys to `.env.local`

---

## API Issues

### "Unauthorized: Invalid or missing API token" (401)

**Symptom**: API requests fail with 401 error

**Causes & Solutions**:

1. **Development mode - API_AUTH_TOKEN not set**:
   - If `API_AUTH_TOKEN` is not set in `.env.local`, auth is disabled
   - This is normal in development

2. **Production mode - Missing token in request**:
   ```bash
   # Add token to your request
   curl -H "Authorization: Bearer your_token_here" \
        https://yourdomain.com/api/agent
   ```

3. **Token mismatch**:
   - Ensure the token in your request matches `API_AUTH_TOKEN` in `.env.local`
   - Tokens are case-sensitive

---

### "Rate limit exceeded" (429)

**Symptom**: Too many requests error

**Solution**:
1. **Wait for reset**: Check `Retry-After` header for wait time
2. **Increase limit**: In `.env.local`:
   ```env
   RATE_LIMIT_MAX_REQUESTS=100
   RATE_LIMIT_WINDOW_MS=60000
   ```
3. **Use different IP**: Rate limits are per IP address

---

### "Input exceeds maximum length" (400)

**Symptom**: Large prompts rejected

**Solution**:
1. Reduce input length (max 10,000 characters)
2. Break large requests into smaller chunks
3. Modify limit in `backend/utils/validation.ts` if needed:
   ```typescript
   const MAX_INPUT_LENGTH = 50000 // Increase limit
   ```

---

### "Input contains suspicious content" (400)

**Symptom**: Prompt rejected as suspicious

**Causes**:
- Prompt injection patterns detected
- XSS attempts detected

**Solution**:
1. Rephrase your prompt to avoid trigger phrases like:
   - "ignore all previous instructions"
   - "system: you are"
   - `<script>` tags
2. If legitimate use case, modify patterns in `backend/utils/validation.ts`

---

### "Request timeout" (504)

**Symptom**: Request takes longer than 2 minutes

**Solution**:
1. **Simplify prompt**: Break complex tasks into smaller requests
2. **Increase timeout**: In `app/api/agent/route.ts`:
   ```typescript
   const timeoutMs = 300000 // 5 minutes
   ```
3. **Optimize tools**: Ensure tools respond quickly

---

## Agent Issues

### "CLAUDE_API_KEY environment variable is required"

**Symptom**: Agent fails to start

**Solution**:
1. Add API key to `.env.local`:
   ```env
   CLAUDE_API_KEY=your_actual_api_key_here
   ```
2. Get key from [Anthropic Console](https://console.anthropic.com/)
3. Restart dev server: `npm run dev`

---

### Agent returns "No response generated"

**Causes & Solutions**:

1. **Empty model response**:
   - Check Anthropic API status
   - Verify API key is valid
   - Check rate limits on Anthropic account

2. **Error in agent client**:
   - Check console logs for errors
   - Verify Claude SDK version: `npm list @anthropic-ai/claude-agent-sdk`

3. **Network issues**:
   - Check internet connection
   - Verify firewall allows Anthropic API access

---

### Agent not using tools

**Symptom**: Agent responds without calling available tools

**Causes & Solutions**:

1. **Tool description unclear**:
   - Make tool descriptions more specific
   - Explain when to use the tool
   - Example:
     ```typescript
     description: "Fetches weather data for a city. Use when user asks about weather, temperature, or forecast."
     ```

2. **Tool not registered**:
   - Verify tool is in `backend/tools/index.ts`
   - Check tool exports correctly
   - Restart dev server

3. **Model choice**:
   - Some prompts don't require tools
   - Be more explicit: "Use the weather tool to check weather in Paris"

---

## Tool Issues

### Tool not appearing in agent

**Symptom**: New tool not available to agent

**Solution**:
1. **Export tool**: Ensure tool is exported:
   ```typescript
   export const myTool = { ... }
   ```

2. **Register tool**: Add to `backend/tools/index.ts`:
   ```typescript
   const toolModules = [
     // ...
     import("./myTool"),
   ]
   ```

3. **Restart server**:
   ```bash
   npm run dev
   ```

4. **Check console**: Look for tool loading errors

---

### Tool execution fails

**Symptom**: Tool returns error or doesn't work

**Debugging steps**:

1. **Test tool directly**:
   ```typescript
   // In a test file
   import { myTool } from './myTool'
   const result = await myTool.execute({ /* args */ })
   console.log(result)
   ```

2. **Check error logs**:
   - Look at server console output
   - Check for missing dependencies
   - Verify environment variables

3. **Add logging**:
   ```typescript
   import { logger } from '../utils/logger'

   execute: async (args) => {
     logger.info('Tool called', { args })
     try {
       // ...
     } catch (error) {
       logger.error('Tool failed', error)
     }
   }
   ```

---

### Tool has missing dependencies

**Symptom**: Tool fails with import errors

**Solution**:
```bash
# Install required package
npm install <package-name>

# Example for Stripe tool
npm install stripe
```

---

## Deployment Issues

### Vercel build fails

**Common causes**:

1. **Peer dependency issues**:
   ```json
   // vercel.json
   {
     "buildCommand": "npm install --legacy-peer-deps && npm run build"
   }
   ```

2. **Missing environment variables**:
   - Add `CLAUDE_API_KEY` in Vercel dashboard
   - Settings → Environment Variables

3. **TypeScript errors**:
   ```bash
   # Run locally to see errors
   npm run build
   ```

---

### Environment variables not working on Vercel

**Symptom**: `CLAUDE_API_KEY` undefined in production

**Solution**:
1. Add variables in Vercel dashboard: Settings → Environment Variables
2. Set for Production, Preview, and Development
3. Redeploy after adding variables
4. Check variable names match exactly (case-sensitive)

---

### API routes return 404 in production

**Symptom**: `/api/agent` works locally but not in production

**Solution**:
1. Verify Next.js version supports App Router
2. Check `app/api/agent/route.ts` exists
3. Ensure proper export:
   ```typescript
   export async function POST(request: Request) { ... }
   ```

---

## Testing Issues

### Vitest tests fail to run

**Symptom**: `npm test` fails

**Solution**:
1. **Install dependencies**:
   ```bash
   npm install --save-dev vitest @vitest/ui @testing-library/react
   ```

2. **Check config**: Verify `vitest.config.ts` exists

3. **Clear cache**:
   ```bash
   rm -rf node_modules/.vite
   npm test
   ```

---

### Tests timeout

**Symptom**: Tests exceed timeout limit

**Solution**:
```typescript
// In test file
it('should work', async () => {
  // ...
}, { timeout: 10000 }) // 10 seconds
```

---

### Mock environment variables not working

**Symptom**: Tests fail due to missing env vars

**Solution**:
```typescript
// In vitest.setup.ts or test file
beforeEach(() => {
  process.env.CLAUDE_API_KEY = 'test-key'
  process.env.API_AUTH_TOKEN = 'test-token'
})
```

---

## Performance Issues

### Slow API responses

**Symptom**: Requests take a long time

**Debugging**:
1. **Use performance monitoring**:
   ```typescript
   import { monitorPerformance } from '../utils/logger'

   const monitor = monitorPerformance('agent-call')
   // ... operation ...
   monitor.end()
   ```

2. **Check tool performance**: Some tools may be slow
3. **Simplify prompts**: Shorter prompts = faster responses
4. **Check Anthropic API status**: [status.anthropic.com](https://status.anthropic.com)

---

### High memory usage

**Symptom**: Server uses lots of memory

**Causes & Solutions**:

1. **Tool caching**:
   - Clear tool cache if needed
   - Implement cache size limits

2. **Rate limiter storage**:
   - In-memory rate limiter stores request history
   - Consider Redis for production

3. **Logging**:
   - Reduce log level in production:
     ```env
     LOG_LEVEL=WARN
     ```

---

### Rate limiting too aggressive

**Symptom**: Legitimate requests blocked

**Solution**:
1. **Increase limits**: In `.env.local`:
   ```env
   RATE_LIMIT_MAX_REQUESTS=50
   RATE_LIMIT_WINDOW_MS=60000
   ```

2. **Use Redis**: Implement Redis-based rate limiting for better control

3. **Whitelist IPs**: Add IP whitelist logic to rate limiter

---

## Getting Help

If you're still stuck:

1. **Check logs**: Look at both client and server console output
2. **Enable debug logging**:
   ```env
   LOG_LEVEL=DEBUG
   ```
3. **Search issues**: [GitHub Issues](https://github.com/kriszwart/zwartifyos/issues)
4. **Ask for help**: Create a new issue with:
   - Steps to reproduce
   - Error messages
   - Environment details (Node version, OS, etc.)
   - Relevant logs

---

## Quick Reference

### Restart Everything

```bash
# Kill all processes
# Clear caches
rm -rf node_modules/.next .turbo

# Reinstall
npm install --legacy-peer-deps

# Restart dev server
npm run dev
```

### Check Environment

```bash
# Verify Node version (should be 18+)
node --version

# Verify npm version
npm --version

# Check installed packages
npm list --depth=0

# Verify environment variables
cat .env.local
```

### Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint
npm run lint

# Test coverage
npm run test:coverage
```
