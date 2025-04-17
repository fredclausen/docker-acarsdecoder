const express = require("express");
const { MessageDecoder } = require("@airframes/acars-decoder");
const winston = require("winston");
const decoder = new MessageDecoder();

const app = express();
const port = process.env.PORT || 3000;

// set up logging

// Formatting for logging
let alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "[ACARS DECODER]",
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      `${info.label}[${info.timestamp}][${info.service}][${info.level}] ${info.message}`
  )
);

// Create the logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV !== "production" ? "debug" : "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      ),
    }),
  ],
  defaultMeta: { service: "Logger Setup" },
});

/**
 * Set the log level based on the environment variable
 * If the log level is not set, default to info
 *
 * To set the log level, the environment variable LOG_LEVEL should be set to one of the following:
 *  * error, warn, info, http, verbose, debug, silly
 */
if (process.env.LOG_LEVEL !== undefined) {
  logger.info("Log level inputted as " + process.env.LOG_LEVEL);
  // if the log level is set, we'll use that
  // but verify it's a valid log level
  if (
    ["error", "warn", "info", "http", "verbose", "debug", "silly"].includes(
      process.env.LOG_LEVEL
    )
  ) {
    logger.level = process.env.LOG_LEVEL;
  } else if ([0, 1, 2, 3, 4, 5, 6].includes(parseInt(process.env.LOG_LEVEL))) {
    logger.level = process.env.LOG_LEVEL;
  } else {
    logger.error("Invalid log level set. Defaulting to info", {
      service: "Logger Setup",
    });
    logger.level = "info";
  }
} else {
  logger.level = "info";
  logger.info("No log level set. Defaulting to info", {
    service: "Logger Setup",
  });
}

/**
  * The route to decode messages sent in via a POST request.
  * The message should be sent as a JSON object in the body of the request.

  Returns one of the following back in the response:

  * 200 OK - The message was valid JSON. If the DECODER itself was able to handle the message and decode, you will see the key "decoded": true in the top level of the response JSON. If the messaage was not decoded, you will see the key "decoded": false in the top level of the response JSON. The decoded fields are described in the "DECODED.md" document
  * 400 - The message was not valid JSON. The error will be returned in the response body.

*/

app.post("/decode", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    try {
      logger.debug(`Decoding message: ${data}`, {
        service: "Decoder",
      });
      let data_json = JSON.parse(data);
      const decoded = decoder.decode(data_json);
      res.json(decoded);
    } catch (err) {
      logger.error(`Error decoding message\nERROR: ${err}\nMessage: ${data}`, {
        service: "Decoder",
      });
      res.status(400).json({
        error: "Error decoding message",
        message: `${err}`,
      });
    }
  });
});

app.listen(port, () => {
  logger.info(`Listening to requests on port ${port}`);
});

process.on("SIGINT", () => exit()); // CTRL+C
process.on("SIGQUIT", () => exit()); // Keyboard quit
process.on("SIGTERM", () => exit()); // `kill` command

function exit() {
  logger.info("Exiting...");
  process.exit(0);
}
