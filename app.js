
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";


const dropdowns = document.querySelectorAll("select");
const button = document.querySelector("button");
const message = document.querySelector(".msg");

const fromCurrency = document.querySelector("select[name='from']");
const toCurrency = document.querySelector("select[name='to']");


for (let select of dropdowns) {
  for (let code in countryList) {
    let option = document.createElement("option");
    option.innerText = code;
    option.value = code;

   
    if (select.name === "from" && code === "USD") {
      option.selected = true;
    }

    if (select.name === "to" && code === "INR") {
      option.selected = true;
    }

    select.append(option);
  }


  select.addEventListener("change", function (event) {
    updateFlag(event.target);
  });
}


function updateFlag(selectBox) {
  let currencyCode = selectBox.value;
  let countryCode = countryList[currencyCode];

  let img = selectBox.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}



async function getExchangeRate() {
  let amount = document.querySelector(".amount input").value;

  if (amount === "" || amount <= 0) {
    amount = 1;
  }

  let from = fromCurrency.value.toLowerCase();
  let to = toCurrency.value.toLowerCase();

  let url = `${BASE_URL}/${from}.json`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    let rate = data[from][to];

    let result = (amount * rate).toFixed(2);

    message.innerText = `${amount} ${fromCurrency.value} = ${result} ${toCurrency.value}`;
  } catch (error) {
    message.innerText = "Could not get exchange rate ❌";
  }
}
button.addEventListener("click", function (event) {
  event.preventDefault();
  getExchangeRate();
});
window.addEventListener("load", getExchangeRate);

