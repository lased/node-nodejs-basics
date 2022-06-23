import * as fs from "fs";
import * as path from "path";
import * as http from "http";

const HTTP_PORT = 8000;

const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const file_path =
    __dirname + (req.url === "/" ? "/public/index.html" : "/public/" + req.url);

  try {
    const stream = fs.createReadStream(file_path);

    res.writeHead(200);
    stream.pipe(res);
    stream.on("error", (error) => {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    });
  } catch (error) {
    res.writeHead(404);
    res.end(JSON.stringify(error));
  }
});

httpServer.listen(HTTP_PORT, () => {
  console.info("========================================");
  console.info(`Static server running on port ${HTTP_PORT}`);
});
