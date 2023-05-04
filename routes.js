const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log("randd");

  if (url === "/") {
    res.write(
      '<html><header><title>Enter Message</title></header><body><form action="/message" method="POST"><input type="text" name ="message"><button type="submit">send</button></form></body></html>'
    );
    
    return res.end;
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    // fs.writeFileSync('message.txt','Dummy');
    res.statusCode = "302";
    res.setHeader("location", "/");
    return res.end();
  }

  console.log(req.url, req.method, req.headers);

  // process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><header><title>My first page</title></header><body><h1>This is my fist node.js page</h1></body></html>"
  );
  res.end;
};

// module.exports =requestHandler;

module.exports = {
  handler: requestHandler,
  someText: "some hard",
};

// module.exports.handler =requestHandler;
// module.exports.someText='Divyank';

// exports.handler =requestHandler;
// exports.someText='Divyank';
