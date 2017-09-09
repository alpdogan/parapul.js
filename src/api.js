var request = require("request");

class Api{

    constructor(){
        this.url = "http://api.fixer.io/latest";
    }

    getCurrency(base, callback){
        let baseUrl = `${this.url}?base=${base}`;
        request(baseUrl, (err, response) => {
            if(err)
                throw err;
            callback(JSON.parse(response.body));
        })
    }

}

module.exports = Api;