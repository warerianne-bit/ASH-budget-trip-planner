import { useState, useEffect } from "react";

function CurrencyConverter() {

  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("EUR");
  const [message, setMessage] = useState("Loading rates...");

  useEffect(() => {
    fetch(
      "https://latest.currency-api.pages.dev/v1/currencies/aud.json"
    )
      .then(res => {
        if (!res.ok) throw new Error("Rates unavailable");
        return res.json();
      })
      .then(data => {
        setRates(data.aud || {});
        setMessage("Exchange rates unavailable");
      })
      .catch(() => {
        setMessage("Unable to load exchange rates");
      });
  }, []);

  const rate = rates[currency.toLowerCase()];
  const result = Number(amount) * rate;

  return (
    <section>
      <h2>Currency Converter</h2>

      <label>Amount in AUD</label>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <label>Convert to</label>
      <select
        value={currency}
        onChange={e => setCurrency(e.target.value)}
      >
        <option value="EUR">Euro</option>
        <option value="USD">US Dollar</option>
        <option value="GBP">British Pound</option>
        <option value="JPY">Japanese Yen</option>
        <option value="THB">Thai Baht</option>
        <option value="IDR">Indonesian Rupiah</option>
        <option value="NZD">New Zealand Dollar</option>
      </select>

      <h3>
        {rate && amount !== "" && Number(amount) >= 0
          ? `${result.toFixed(2)} ${currency}`
          : rate ? "Enter a valid amount" : message}
      </h3>

    </section>
  );
}

export default CurrencyConverter;