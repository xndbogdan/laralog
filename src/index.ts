import { DateTime } from "luxon";
import * as fs from "node:fs";

type LogType = "info" | "error" | "warning" | "debug" | null | undefined;

const generateLogLine = (exception: Error | unknown, logType?: LogType) => {
  const timestamp = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
  if (exception instanceof Error) {
    if (!logType) {
      return `[${timestamp}] ${exception.message}` + "\n";
    }
    return `[${timestamp}] ${logType}: ${exception.message}` + "\n";
  }
  if (!logType) {
    return `[${timestamp}] ${exception}` + "\n";
  }
  return `[${timestamp}] ${logType}: ${exception}` + "\n";
};
// new code
const log = async (exception: Error | unknown, logType?: LogType) => {
  // Check if logs folder exists if not create it
  const logsDir = "logs";
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // check if LOG_CHANNEL is stack or single
  const logChannel = process.env.LOG_CHANNEL || "stack";
  let logFile = "";
  if (logChannel === "stack") {
    logFile = `logs/laralog-${DateTime.now().toFormat("yyyy-MM-dd")}.log`;
  } else {
    logFile = `logs/laralog.log`;
  }

  // check if file exists
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, "");
  }

  // write to file
  fs.writeFileSync(logFile, generateLogLine(exception, logType), { flag: "a" });
};

const debug = async (exception: Error | unknown) => {
  log(exception, "debug");
}

const info = async (exception: Error | unknown) => {
  log(exception, "info");
}

const error = async (exception: Error | unknown) => {
  log(exception, "error");
}

const warning = async (exception: Error | unknown) => {
  log(exception, "warning");
}

/**
 * @deprecated Use `log` instead. Will be removed by next release.
 */
const logToFile = async (exception: Error | unknown, logType?: LogType) => {
  console.warn("logToFile is deprecated. Use `log` instead.");
  await log(exception, logType);
};

export { log, LogType, debug, info, error, warning, logToFile };
