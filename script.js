document.addEventListener("DOMContentLoaded", async () => {
    const currenciesUrl = `https://api.exchangerate-api.com/v4/latest/USD`; // Base currency set to USD
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    try {
        const response = await fetch(currenciesUrl);
        const data = await response.json();

        if (data.rates) {
            const currencies = Object.keys(data.rates);
            currencies.forEach((currency) => {
                const option1 = new Option(currency, currency);
                const option2 = new Option(currency, currency);
                fromCurrency.add(option1);
                toCurrency.add(option2);
            });
        } else {
            alert("Error loading currencies.");
        }
    } catch (error) {
        console.error("Error fetching currencies:", error);
        alert("Failed to fetch currencies. Please check your connection.");
    }
});

document.getElementById("convertBtn").addEventListener("click", async () => {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount || !fromCurrency || !toCurrency) {
        alert("Please enter a valid amount and select both currencies.");
        return;
    }

    try {
        const currenciesUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await fetch(currenciesUrl);
        const data = await response.json();

        const exchangeRate = data.rates[toCurrency];

        if (!exchangeRate) {
            throw new Error("Invalid currency.");
        }

        const convertedAmount = amount * exchangeRate;
        document.getElementById("convertedAmount").value = convertedAmount.toFixed(2);
    } catch (error) {
        console.error("Error fetching conversion rates:", error);
        alert("Failed to fetch conversion rates. Please try again.");
    }
});