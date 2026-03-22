const btnConvert = document.querySelector('.btn-convert');
const currencySelectFrom = document.querySelector('.currency-select-from');
const currencySelectTo = document.querySelector('.currency-select-to');

const currencyValueToConvertEl = document.querySelector('.currency-value-to-convert');
const currencyValueConvertedEl = document.querySelector('.currency-value-converted');
const currencyImgFrom = document.querySelector('.currency-img-from');
const currencyNameFrom = document.querySelector('.currency-name-from');
const currencyImgTo = document.querySelector('.currency-img');
const currencyNameTo = document.getElementById('currency-name');

let dolarToday = 5.2;
let euroToday = 6.2;
let bitcoinToday = 0.0000047;
let realToday = 1;

function getCurrencyMeta(code) {
  const map = {
    BRL: { name: 'Real', img: './assets/brl.png', locale: 'pt-BR', symbol: 'BRL' },
    USD: { name: 'Dólar americano', img: './assets/usd.png', locale: 'en-US', symbol: 'USD' },
    EUR: { name: 'Euro', img: './assets/eur.png', locale: 'de-DE', symbol: 'EUR' },
    BTC: { name: 'Bitcoin', img: './assets/btc.png', locale: 'en-US', symbol: 'BTC' },
  };
  return map[code] || map.BRL;
}

function getRate(code) {
  if (code === 'BRL') return realToday;
  if (code === 'USD') return dolarToday;
  if (code === 'EUR') return euroToday;
  if (code === 'BTC') return bitcoinToday;
  return null;
}

async function fetchExchangeRates() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

    const data = await response.json();

    dolarToday = Number(data.USDBRL.bid.replace(',', '.'));
    euroToday = Number(data.EURBRL.bid.replace(',', '.'));
    bitcoinToday = Number(data.BTCBRL.bid.replace(',', '.'));

    return true;
  } catch (error) {
    console.error('fetchExchangeRates:', error);
    alert('Falha ao carregar cotação atual. Verifique sua internet e recarregue.');
    return false;
  }
}

function updateUI() {
  const fromCurrency = currencySelectFrom.value;
  const toCurrency = currencySelectTo.value;

  const fromMeta = getCurrencyMeta(fromCurrency);
  const toMeta = getCurrencyMeta(toCurrency);

  currencyImgFrom.src = fromMeta.img;
  currencyNameFrom.innerText = fromMeta.name;

  currencyImgTo.src = toMeta.img;
  currencyNameTo.innerText = toMeta.name;
}

function convertValues() {
  const input = Number(document.querySelector('.input-currency').value);
  if (!input || input <= 0) {
    alert('Digite um valor maior que zero.');
    return;
  }

  const fromCurrency = currencySelectFrom.value;
  const toCurrency = currencySelectTo.value;

  const fromRate = getRate(fromCurrency);
  const toRate = getRate(toCurrency);

  if (!fromRate || !toRate) {
    alert('Cotaões não disponveis. Aguarde alguns segundos e tente novamente.');
    return;
  }

  const valueInBRL = input * fromRate;
  const converted = valueInBRL / toRate;

  const fromMeta = getCurrencyMeta(fromCurrency);
  const toMeta = getCurrencyMeta(toCurrency);

  currencyValueToConvertEl.innerHTML = new Intl.NumberFormat(fromMeta.locale, {
    style: 'currency', currency: fromMeta.symbol,
  }).format(input);

  currencyValueConvertedEl.innerHTML = new Intl.NumberFormat(toMeta.locale, {
    style: 'currency', currency: toMeta.symbol,
  }).format(converted);
}

async function init() {
  await fetchExchangeRates();
  updateUI();
  convertValues();
  setInterval(fetchExchangeRates, 5 * 60 * 1000);
}

currencySelectFrom.addEventListener('change', () => {
  updateUI();
  convertValues();
});

currencySelectTo.addEventListener('change', () => {
  updateUI();
  convertValues();
});

btnConvert.addEventListener('click', () => {
  convertValues();
});

window.addEventListener('load', init);
