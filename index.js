const express = require("express");
const server = express();
const bodyParser = require("body-parser");

async function runApp() {
    await require("./db").connect();

    server.use(bodyParser.json());
    server.use("/api/v1/portfolios", require("./routes/portfolios"));
    server.use("/api/v1/blogs", require("./routes/blogs"));

    const PORT = process.env.PORT || 3001;
    server.listen(PORT, (err) => {
        if (err) console.error(err);
        console.log(">> Server ready on port :: ", PORT);
    });
}

runApp();
