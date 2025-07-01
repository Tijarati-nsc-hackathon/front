import React, { useState } from 'react';
import './Payment.css';
import { CreditCard, X } from 'lucide-react';
import edahabya from '../assets/edahabya.png';

const Payment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s]/g, ''); // Allow only digits and spaces
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d/]/g, '');

    // Auto insert slash
    if (value.length === 2 && !value.includes('/')) {
      value = value + ' / ';
    }

    // Prevent invalid formats (e.g., month > 12)
    const [month] = value.split('/');
    if (month && parseInt(month) > 12) return;

    setExpiry(value);
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCVC(value);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPostalCode(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment submitted!');
  };

  return (
    <div className="card-payment-page-container">
      <div className="card-payment-page">
        <button className="card-payment-page-close">
          <X size={24} />
        </button>

        <div className="card-payment-page-tab-container">
          <div className="card-payment-page-tab card-payment-page-tab-active">
            <div className="card-payment-page-tab-icon-wrapper">
              <CreditCard size={18} className="card-payment-page-tab-icon" />
            </div>
            <span>Card</span>
          </div>
          <div className="card-payment-page-tab-separator"></div>
          <div className="card-payment-page-other-tabs">...</div>
        </div>

        <form className="card-payment-form" onSubmit={handleSubmit}>
          <label>
            Card number
            <div className="card-number-input-wrapper">
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                maxLength={19}
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
              />
              <img src={edahabya} alt="Card type" className="card-type-icon" />
            </div>
          </label>

          <div className="card-payment-page-row">
            <label>
              Expiry
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                value={expiry}
                onChange={handleExpiryChange}
                required
              />
            </label>
            <label>
              CVC
              <input
                type="text"
                placeholder="CVC"
                maxLength={3}
                value={cvc}
                onChange={handleCVCChange}
                required
              />
            </label>
          </div>

          <div className="card-payment-page-row">
            <label>
              Country
              <select required>
                <option>Algeria</option>
                <option>France</option>
                <option>USA</option>
              </select>
            </label>
            <label>
              Postal code
              <input
                type="text"
                placeholder="90210"
                value={postalCode}
                onChange={handlePostalCodeChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="card-payment-page-pay-btn">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
