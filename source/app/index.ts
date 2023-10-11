import { createServer } from "http";
import getAllProcess, { Process } from "../child_process/index.js";

const port = 8000;

createServer((req: any, res: any) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  getAllProcess()
    .then((data: Process[]) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
}).listen(port, () => {
  console.log(`App Listening @ ${port}`);
});
