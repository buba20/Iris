var express = require("express"),
    path = require("path"),
    publicDirectoryPath = path.join(__dirname,"../public"),
    app = express();

app.use("/",express.static(publicDirectoryPath));

app.get("/api", function (req, res) {
    res.json();
});

app.get("/api/:id", function (req, res) {
    res.json({name:"asda"});
});

module.exports = function(portNumber){

    var server = app.listen(portNumber || 3000, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port)

    });
};
