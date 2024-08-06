const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    // Listen for messages from worker
    worker.on("message", (msg) => {
      console.log(
        `Master received message from worker ${worker.process.pid}:`,
        msg
      );
    });
  }

  cluster.on("fork", (worker) => {
    console.log(`Worker ${worker.process.pid} is forked`);
  });

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("listening", (worker, address) => {
    console.log(
      `Worker ${worker.process.pid} is listening on ${address.address}:${address.port}`
    );
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("hello world\n");
      process.send({ cmd: "notifyRequest" }); // Send message to master process
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
