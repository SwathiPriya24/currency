document.addEventListener("DOMContentLoaded", async () => {
    const currenciesUrl = `https://open.er-api.com/v6/latest`;
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    try {
        const response = await fetch(currenciesUrl);
        const data = await response.json();

        if (data.result === "success") {
            const currencies = Object.keys(data.rates);
            currencies.forEach((code) => {
                const option = new Option(code, code);
                fromCurrency.add(option);
                if (fromCurrency.length > 1) {
                    const optionClone = option.cloneNode(true);
                    toCurrency.add(optionClone);
                }
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
        const currenciesUrl = `https://open.er-api.com/v6/latest`;
        const response = await fetch(currenciesUrl);
        const data = await response.json();

        const rateFrom = data.rates[fromCurrency];
        const rateTo = data.rates[toCurrency];

        const convertedAmount = (amount / rateFrom) * rateTo;

        document.getElementById("convertedAmount").value = convertedAmount.toFixed(2);
    } catch (error) {
        console.error("Error fetching conversion rates:", error);
        alert("Failed to fetch conversion rates. Please try again.");
    }
});