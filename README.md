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

Import the logging functions in your Node.js application:

```typescript
import { log, debug, info, error, warning } from "laralog";
```

### In Exception Handler

#### AdonisJS Example

Add it to your exception handler in `app/exceptions/handler.ts`:

```typescript
import { error } from 'laralog';

// ...

async report(error: unknown, ctx: HttpContext) {
  await error(error);
  return super.report(error, ctx);
}
```

#### Express.js Example

Add it to your error handling middleware:

```typescript
import { error } from "laralog";

// Error handling middleware
app.use((err, req, res, next) => {
  error(err);
  res.status(500).send("Something went wrong");
});
```

### Logging Methods

The library provides several helper methods for different log types:

```typescript
// Basic logging
await log("User logged in: " + user.email);

// Log with specific types
await debug("Debug information");
await info("User logged in: " + user.email);
await error(new Error("Something went wrong"));
await warning("Disk space is running low");
```

### Using LogType

You can import the LogType to create custom logging functions or type your variables:

```typescript
import { log, LogType } from "laralog";

// Create a function that accepts a specific log type
function customLogger(message: string, type: LogType) {
  return log(message, type);
}

// Use it with type safety
await customLogger("Database connection established", "info");
await customLogger("Cache miss", "debug");

// Type a configuration object
const logConfig: { level: LogType; persistent: boolean } = {
  level: "warning", // Only "info", "error", "warning", "debug", null, or undefined are allowed
  persistent: true,
};
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

## Deprecation Notice

The `logToFile` method is deprecated and will be removed in the next release. Please use the `log` method instead.

## Links

- [NPM Package](https://www.npmjs.com/package/laralog)
- [GitHub Repository](https://github.com/xndbogdan/laralog)

## License

MIT
