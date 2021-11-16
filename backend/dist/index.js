"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
// import {readFileSync} from 'fs'
// import {createServer as createSecureServer} from 'https'
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.join(__dirname, "../.env") });
// const options = {
//   key:readFileSync(path.join(__dirname, "/ssl/server.key"), 'utf8'),
//   cert:readFileSync(path.join(__dirname, "/ssl/server.cert"), 'utf8')
// };
const server = http_1.createServer(app_1.default);
// const secureServer = createSecureServer(options, app);
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
server.on("error", handleError);
// secureServer.on("error", handleError);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT || 5000}`);
});
// secureServer.listen(process.env.PORT || 8433, () => {
//   console.log(`Listening on https://localhost:${process.env.PORT || 8433}`);
// });
//# sourceMappingURL=index.js.map