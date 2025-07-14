let express = require("express");
let fs = require("fs");
let path = require("path");
const PORT = 3001;
let app = express();
app.use(express.static(path.join(__dirname, "")));
app.get("/", (req, res, next) => {
    let masterPage = fs.readFileSync(path.join(__dirname, "..", "index.html")).toString();
    res.send(masterPage);
});
app.get("/style.css", (req, res, next) => {
    fs.readFile(path.join(__dirname, "..", "style.css"), "utf8", (err, data) => {
        if (err)
            return next(err);
        res.setHeader("Content-Type", "text/css");
        res.send(data);
    });
});
app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});
