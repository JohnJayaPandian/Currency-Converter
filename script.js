const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const valuetoChange = document.getElementById("amount")
const resultBar = document.getElementById("result");
currencies = [
    {"AUD": "Australian Dollar"},
    {"BGN": "Bulgarian Lev"},
    {"BRL": "Brazilian Real"},
    {"CAD": "Canadian Dollar"},
    {"CHF": "Swiss Franc"},
    {"CNY": "Chinese Renminbi Yuan"},
    {"CZK": "Czech Koruna"},
    {"DKK": "Danish Krone"},
    {"EUR": "Euro"},
    {"GBP": "British Pound"},
    {"HKD": "Hong Kong Dollar"},
    {"HUF": "Hungarian Forint"},
    {"IDR": "Indonesian Rupiah"},
    {"ILS": "Israeli New Sheqel"},
    {"INR": "Indian Rupee"},
    {"ISK": "Icelandic Króna"},
    {"JPY": "Japanese Yen"},
    {"KRW": "South Korean Won"},
    {"MXN": "Mexican Peso"},
    {"MYR": "Malaysian Ringgit"},
    {"NOK": "Norwegian Krone"},
    {"NZD": "New Zealand Dollar"},
    {"PHP": "Philippine Peso"},
    {"PLN": "Polish Złoty"},
    {"RON": "Romanian Leu"},
    {"SEK": "Swedish Krona"},
    {"SGD": "Singapore Dollar"},
    {"THB": "Thai Baht"},
    {"TRY": "Turkish Lira"},
    {"USD": "United States Dollar"},
    {"ZAR": "South African Rand"}
]
currencies.forEach((currency) =>{
    for (let [code, name] of Object.entries(currency)) {
        const option = document.createElement("option");
        option.value = code;
        option.text = name;
        fromDropDown.add(option);
    }
});

currencies.forEach((currency) =>{
    for (let [code, name] of Object.entries(currency)) {
        const option = document.createElement("option");
        option.value = code;
        option.text = name;
        toDropDown.add(option);
    }
});
toDropDown.value = "INR";
toDropDown.text = "Indian Rupee";

function convertCon() {
    let amount = document.querySelector("#amount").value;
    let fromCurr = fromDropDown.value;
    let toCurr = toDropDown.value;

    if (amount.length != 0){
        convert(fromCurr,toCurr,amount)}
    else
        resultBar.innerText = "Please fill amount !";
};
function convert(fromCurr,toCurr,amount)
{
    if (fromCurr == toCurr)
        resultBar.innerText = "1 "+fromCurr+" = 1 "+toCurr;
    else{
    let name1 = currencies.find(item => Object.keys(item)[0] === fromCurr);
    let name2 = currencies.find(item => Object.keys(item)[0] === toCurr);
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`)
    .then(resp => resp.json())
    .then((data) => {
    let result = Object.values(data.rates)[0];
    resultBar.innerText = amount+" "+Object.values(name1)[0]+" = "+result+" "+Object.values(name2)[0];
    });}
}
