const btnConvert = document.querySelector(".btn-convert");
const currencySelect = document.querySelector(".currency-select-to");

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert",
  );
  const currencyValueConverted = document.querySelector(
    ".currency-value-converted",
  );

  const dolarToday = 5.2;
  const euroToday = 6.2;
  const bitcoinToday = 0.0000047;

  if (currencySelect.value == "USD") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrencyValue/dolarToday);
    
  }
  if (currencySelect.value == "EUR") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputCurrencyValue/euroToday);
    
  }
  
  if (currencySelect.value == "BTC") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BTC",
      }).format(inputCurrencyValue/bitcoinToday);
  }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputCurrencyValue);

}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector(".currency-img");

    if (currencySelect.value == "USD") {
        currencyImg.src = "./assets/usd.png";
        currencyName.innerHTML = "Dólar americano";
    }
    if (currencySelect.value == "EUR") {
        currencyImg.src = "./assets/eur.png";
        currencyName.innerHTML = "Euro";
    }
    if (currencySelect.value == "BTC") {
        currencyImg.src = "./assets/btc.png";
        currencyName.innerHTML = "Bitcoin";
    }
    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
btnConvert.addEventListener("click", convertValues);
