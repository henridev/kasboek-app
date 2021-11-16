"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import {createServer} from 'http'
const fs_1 = require("fs");
const https_1 = require("https");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.join(__dirname, "../.env") });
const options = {
    key: fs_1.readFileSync('../ssl/domain.key'),
    cert: fs_1.readFileSync('../ssl/domain.cert')
};
// const server = createServer(app);
const secureServer = https_1.createServer(options, app_1.default);
const handleError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`Port ${process.env.PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Port ${process.env.PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};
// server.on("error", handleError);
secureServer.on("error", handleError);
// server.listen(process.env.PORT || 5000, () => {
//   console.log(`Listening on http://localhost:${process.env.PORT || 5000}`);
// });
secureServer.listen(process.env.PORT || 4433, () => {
    console.log(`Listening on https://localhost:${process.env.PORT || 4433}`);
});
//# sourceMappingURL=index.js.map