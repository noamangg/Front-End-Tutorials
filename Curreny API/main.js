fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=53338148791d45038465008c449ba18b")
.then((result) => {
    return result.json();
}).then((currency) => {
    let EGPNumber = document.getElementById("input-number");
    EGPNumber.oninput = function (e) {
        let USDNumber = document.getElementById("exchange-curreny");
        USDNumber.innerHTML = Math.round(EGPNumber.value * currency.rates["EGP"]);
    
    }
})