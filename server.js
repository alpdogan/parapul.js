var express = require("express");
var Currency = require("./src/currency.js");

var app = express();


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get(['/', "/:from/:to/:value"], (req, resp) => {
    var params = req.params;
    if(params.from && params.to && params.value)
    {
        var model = {
            from: params.from,
            to: params.to,
            value: params.value
        };
        resp.render("index", model);
    }
    else{
        resp.render("index", {from: "USD", to: "TRY", value: ""});        
    }
});


app.get("/api/:from/:to/:value", (req, resp) => {
    let currency = new Currency();
    currency.from(req.params.from).to(req.params.to).convert(req.params.value, (result) => {
        resp.json({
            from: req.params.from,
            to: req.params.to,
            value: Number(req.params.value),
            result: result
        });
    })
})


app.listen(8888, "localhost", () => {
    console.log("server started");
});