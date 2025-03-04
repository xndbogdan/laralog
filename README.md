# Laralog

[![npm version](https://img.shields.io/npm/v/laralog.svg)](https://www.npmjs.com/package/laralog)
[![npm downloads](https://img.shields.io/npm/dm/laralog.svg)](https://www.npmjs.com/package/laralog)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/xndbogdan/laralog/blob/main/LICENSE)

A simple Laravel-like logging utility for AdonisJS applications.

## Installation

```bash
npm i laralog
```

## Usage

Import the `logToFile` function in your AdonisJS application:

```typescript
import { logToFile } from "laralog";
```

### In Exception Handler

Add it to your exception handler in `app/exceptions/handler.ts`:

```typescript
import { logToFile } from 'laralog';

// ...

async report(error: unknown, ctx: HttpContext) {
  await logToFile(error);
  return super.report(error, ctx);
}
```

### Logging Custom Messages

You can also log custom messages:

```typescript
await logToFile("User logged in: " + user.email);
```

## Log Storage

Logs are stored in a `logs` directory in the root of your project:

- When `LOG_CHANNEL` is set to `stack` (default): `logs/adonis-YYYY-MM-DD.log` (daily log files)
- When `LOG_CHANNEL` is set to `single`: `logs/adonis.log` (single log file)

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
