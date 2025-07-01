import React from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$18',
      period: '/month',
      description: 'Unleash the power of automation.',
      features: [
        'Multi-step Zaps',
        '3 Premium Apps',
        '2 Users team'
      ],
      buttonText: 'Choose plan',
      buttonClass: 'btn-starter',
      cardClass: 'card-starter'
    },
    {
      name: 'Professional',
      price: '$54',
      period: '/month',
      description: 'Advanced tools to take your work to the next level.',
      features: [
        'Multi-step Zaps',
        'Unlimited Premium',
        '50 Users team',
        'Shared Workspace'
      ],
      buttonText: 'Choose plan',
      buttonClass: 'btn-professional',
      cardClass: 'card-professional'
    },
    {
      name: 'Company',
      price: '$89',
      period: '/month',
      description: 'Automation plus enterprise-grade features.',
      features: [
        'Multi-step Zaps',
        'Unlimited Premium',
        'Unlimited Users team',
        'Advanced Admin',
        'Custom Data Retention'
      ],
      buttonText: 'Choose plan',
      buttonClass: 'btn-company',
      cardClass: 'card-company',
      isPopular: true
    }
  ];

  return (
    <div className="pricing-container">      
      <div className="pricing-content">
        <div className="pricing-header">
          <h1>Plans & Pricing</h1>
          <p>Whether your time-saving automation needs are large or small, we're here to help you scale.</p>
          
          <div className="billing-toggle">
            <span className="toggle-option active">MONTHLY</span>
            <span className="toggle-option">YEARLY</span>
          </div>
        </div>

        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.cardClass}`}>
              {plan.isPopular && (
                <div className="popular-badge">MOST POPULAR</div>
              )}
              
              <div className="card-content">
                <div className="price-section">
                  <div className="price">
                    <span className="currency">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="features-section">
                  <ul className="features-list">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <Check className="check-icon" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`plan-button ${plan.buttonClass}`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;