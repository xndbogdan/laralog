# Laralog

[![npm version](https://img.shields.io/npm/v/laralog.svg)](https://www.npmjs.com/package/laralog)
[![npm downloads](https://img.shields.io/npm/dm/laralog.svg)](https://www.npmjs.com/package/laralog)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/xndbogdan/laralog/blob/main/LICENSE)

A simple Laravel-like logging utility for Node.js applications. Developed for AdonisJS but also works well with Express.js and other Node.js frameworks.

## Installation

```bash
npm i laralog
```

## Usage

Import the `logToFile` function in your Node.js application:

```typescript
import { logToFile } from "laralog";
```

### In Exception Handler

#### AdonisJS Example

Add it to your exception handler in `app/exceptions/handler.ts`:

```typescript
import { logToFile } from 'laralog';

// ...

async report(error: unknown, ctx: HttpContext) {
  await logToFile(error);
  return super.report(error, ctx);
}
```

#### Express.js Example

Add it to your error handling middleware:

```typescript
import { logToFile } from "laralog";

// Error handling middleware
app.use((err, req, res, next) => {
  logToFile(err);
  res.status(500).send("Something went wrong");
});
```

### Logging Custom Messages

You can also log custom messages:

```typescript
await logToFile("User logged in: " + user.email);
```

## Log Storage

Logs are stored in a `logs` directory in the root of your project:

- When `LOG_CHANNEL` is set to `stack` (default): `logs/laralog-YYYY-MM-DD.log` (daily log files)
- When `LOG_CHANNEL` is set to `single`: `logs/laralog.log` (single log file)

The logger will automatically create the logs directory if it doesn't exist.

## Configuration

Configure the logger using environment variables:

| Variable    | Options           | Default | Description                    |
| ----------- | ----------------- | ------- | ------------------------------ |
| LOG_CHANNEL | `stack`, `single` | `stack` | Determines how logs are stored |

## Links

- [NPM Package](https://www.npmjs.com/package/laralog)
- [GitHub Repository](https://github.com/xndbogdan/laralog)

## License

MIT
