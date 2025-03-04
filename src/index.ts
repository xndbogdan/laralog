import { DateTime } from "luxon";
import * as fs from "node:fs";

const generateLogLine = (exception: Error | unknown) => {
  const timestamp = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
  if (exception instanceof Error) {
    return `[${timestamp}] ${exception.message}` + "\n";
  }
  return `[${timestamp}] ${exception}` + "\n";
};

const logToFile = async (exception: Error | unknown) => {
  // Check if logs folder exists if not create it
  const logsDir = "logs";
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // check if LOG_CHANNEL is stack or single
  const logChannel = process.env.LOG_CHANNEL || "stack";
  let logFile = "";
  if (logChannel === "stack") {
    logFile = `logs/adonis-${DateTime.now().toFormat("yyyy-MM-dd")}.log`;
  } else {
    logFile = `logs/adonis.log`;
  }

  // check if file exists
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, "");
  }

  // write to file
  fs.writeFileSync(logFile, generateLogLine(exception), { flag: "a" });
};

export { logToFile };
