import React, { useState } from "react";
import "./CardDetails.css";

const CardDetails = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = e.target.value
      .replace(/\s/g, "") // Remove spaces
      .match(/.{1,4}/g) // Add spaces every 4 characters
      ?.join(" ");
    setCardNumber(formattedCardNumber || "");
  };

  const handleCardholderNameChange = (e) => {
    setCardholderName(e.target.value);
  };

  const handleExpiryMonthChange = (e) => {
    const month = e.target.value;
    if (
      /^\d{0,2}$/.test(month) &&
      (month === "" || (parseInt(month) >= 1 && parseInt(month) <= 12))
    ) {
      setExpiryMonth(month);
    }
  };

  const handleExpiryYearChange = (e) => {
    const year = e.target.value;
    if (/^\d{0,2}$/.test(year)) {
      setExpiryYear(year);
    }
  };

  const handleCvcChange = (e) => {
    const cvcValue = e.target.value;
    if (/^\d{0,3}$/.test(cvcValue) || cvcValue === "") {
      setCvc(cvcValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation for empty fields
    const errors = {};
    if (!cardNumber) errors.cardNumber = "Card number is required.";
    if (!cardholderName) errors.cardholderName = "Cardholder name is required.";
    if (!expiryMonth) errors.expiryMonth = "Expiry month is required.";
    if (!expiryYear) errors.expiryYear = "Expiry year is required.";
    if (!cvc) errors.cvc = "CVC is required.";

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Validation passed, log the form data and set submitted to true
      setSubmitted(true);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={handleCardholderNameChange}
            className={errors.cardholderName ? "error" : ""}
          />
          {errors.cardholderName && !submitted && (
            <span className="error-text">{errors.cardholderName}</span>
          )}
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={errors.cardNumber ? "error" : ""}
          />
          {errors.cardNumber && !submitted && (
            <span className="error-text">{errors.cardNumber}</span>
          )}
        </div>
        <div className="expiry-cvc">
          <div className="form-group">
            <label>Expiry Month</label>
            <input
              type="text"
              value={expiryMonth}
              onChange={handleExpiryMonthChange}
              maxLength="2"
              className={errors.expiryMonth ? "error" : ""}
            />
            {errors.expiryMonth && !submitted && (
              <span className="error-text">{errors.expiryMonth}</span>
            )}
          </div>
          <div className="form-group">
            <label>Expiry Year</label>
            <input
              type="text"
              value={expiryYear}
              onChange={handleExpiryYearChange}
              maxLength="2"
              className={errors.expiryYear ? "error" : ""}
            />
            {errors.expiryYear && !submitted && (
              <span className="error-text">{errors.expiryYear}</span>
            )}
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={handleCvcChange}
              maxLength="3"
              className={errors.cvc ? "error" : ""}
            />
            {errors.cvc && !submitted && (
              <span className="error-text">{errors.cvc}</span>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div className="card-details">
          <h2>Card Details:</h2>
          <p>Card Number: {cardNumber}</p>
          <p>Cardholder Name: {cardholderName}</p>
          <p>
            Expiry Date: {expiryMonth}/{expiryYear}
          </p>
          <p>CVC: {cvc}</p>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
