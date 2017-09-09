class Parapul{
    constructor(from, to, value) {
        this.apiUrl = "/api/:from/:to/:value";
        this.selectors = {
                    from: ".currency-select-from",
                    to: ".currency-select-to",
                    convert: ".btn-convert",
                    value: ".amount-text-input",
                    swap: ".swap-currency",
                    result: {
                        table: ".result-table",
                        from: ".currency-result-from",
                        to: ".currency-result-to",
                        value: ".currency-result-value",
                        resultValue: ".currency-result-resultValue"
                    }
            };
        this.currencies = ["TRY","AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","USD","ZAR","EUR"];
        this.from = from;
        this.to = to;
        this.value = value;
    }
    
    init(){
        var selectors = this.selectors;
        this.currencies.forEach((currency) => {
            $(`${selectors.from}, ${selectors.to}`).append($('<option>', {
                value: currency,
                text: currency
            }));
        });
        $(selectors.from).change((e) => {
            $(selectors.value).attr("placeholder", `10 ${e.currentTarget.value}`);
        });

        $(selectors.swap).click((e) => {
            var from = $(selectors.from);
            var to = $(selectors.to);
            var fromVal = from.find("option:selected").val();
            var toVal = to.find("option:selected").val();
            from.val(toVal);
            to.val(fromVal);
        })

        $(selectors.convert).click((e) => {
            var from = $(selectors.from).val();
            var to = $(selectors.to).val();
            var value = $(selectors.value).val();
            this.getCurrency(from, to, value, (result) => {
                $(selectors.result.table).show();
                $(selectors.result.from).text(result.from);
                $(selectors.result.to).text(result.to);
                $(selectors.result.value).text(result.value);
                $(selectors.result.resultValue).text(result.result);
                window.history.pushState("parapul.js", "parapul.js", `/${result.from}/${result.to}/${result.value}`);
            });
        });

        if(this.from)
            $(selectors.from).val(this.from);
        if(this.to)
            $(selectors.to).val(this.to);
        if(this.value){
            $(selectors.value).val(this.value);
            $(selectors.convert).trigger("click");
        }
    }
    getCurrency(from, to, value, callback){
        let url = this.apiUrl.replace(":from", from).replace(":to", to).replace(":value", value);
        $.get(url, (data) => {
            callback(data);
        });
    }
}