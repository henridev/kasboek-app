import app from './app'
// import {createServer} from 'http'
import {readFileSync} from 'fs'
import {createServer as createSecureServer} from 'https'
import {config} from 'dotenv'
import path from "path";

config({ path: path.join(__dirname, "../.env") });

const options = {
  key:readFileSync(path.join(__dirname, "/ssl/domain.key")),
  cert:readFileSync(path.join(__dirname, "/ssl/domain.crt"))
};

// const server = createServer(app);
const secureServer = createSecureServer(options, app);

const handleError = (error: any) => {
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
}

// server.on("error", handleError);

secureServer.on("error", handleError);

// server.listen(process.env.PORT || 5000, () => {
//   console.log(`Listening on http://localhost:${process.env.PORT || 5000}`);
// });

secureServer.listen(process.env.PORT || 4433, () => {
  console.log(`Listening on https://localhost:${process.env.PORT || 4433}`);
});


