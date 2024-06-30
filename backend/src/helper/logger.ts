import { Logger, createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const transport: DailyRotateFile = new transports.DailyRotateFile({
  filename: "log/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "5m",
  maxFiles: "14d",
});

const L: Logger = createLogger({
  level: "debug",
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console(), transport],
});

export default L;
