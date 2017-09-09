var Api = require("./api.js");

class Currency{


    from(currency){
        this.from = currency;
        return this;
    }

    to(currency){
        this.to = currency;
        return this;
    }

    convert(val, callback){
        let api = new Api();
        this.value = Number(val);
        let currencies = api.getCurrency(this.from, (currencies) => {
            let currency = currencies.rates[this.to];
            callback(currency * this.value);
        });
    }
}


module.exports = Currency;