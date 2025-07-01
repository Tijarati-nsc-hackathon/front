import React from 'react';
import { useApiQuery } from '../../api/useApiCall';
import './Dash.css'; 

interface SummaryResponse {
  totalPrice: number;
  totalOrders: number;
  highRiskOrder: number;
}

const Dash: React.FC = () => {
  const shopId = '920046e6-be39-408b-9742-b783dc71ee2b'; 
  
  const { data: summaryData, isLoading, error } = useApiQuery<SummaryResponse>(
    ['summary', shopId],
    `analytics/summary/${shopId}`
  );

  if (isLoading) {
    return (
      <div className="summary-cards-container">
        <div className="summary-card">
          <div className="card-details">
            <span className="card-label">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-cards-container">
        <div className="summary-card">
          <div className="card-details">
            <span className="card-label">Error loading data</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-cards-container">
      <div className="summary-card">
        <div className="icon-circle green-light">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
            <path d="M12 20v-6M12 10V4M18 6H6M21 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
          </svg>
        </div>
        <div className="card-details">
          <span className="card-label">Total Revenue Collected</span>
          <span className="card-value">{summaryData?.totalPrice?.toLocaleString() || '0'} DZD</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="icon-circle blue-light">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <div className="card-details">
          <span className="card-label">Total Orders</span>
          <span className="card-value">{summaryData?.totalOrders?.toLocaleString() || '0'}</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="icon-circle pink-light">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M21 5H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path>
          </svg>
        </div>
        <div className="card-details">
          <span className="card-label">Predicted High-Risk Orders</span>
          <span className="card-value">{summaryData?.highRiskOrder || '0'} Orders</span>
        </div>
      </div>
    </div>
  );
};

export default Dash;
