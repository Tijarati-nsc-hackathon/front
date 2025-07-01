// Delivery.tsx
import React from "react";
import { delivery_data } from "./delivery_data.tsx";
import "./Delivery.css";

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "on hold":
      return "#F1C40F"; // yellow/orange
    case "arrived":
      return "#6DD130"; // green
    case "canceled":
      return "#FE5C73"; // red/pink
    default:
      return "#A9A9A9"; // default gray
  }
};

const Delivery: React.FC = () => {
  return (
    <div className="product-list-container">
      <h3 className="product-list-title">Product Inventory</h3>
      
      <div className="products-list">
        {delivery_data?.map((product, index) => (
          <div key={`${product.id}-${index}`} className="product-item">
            
            <div className="product-info">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <span className="product-name">{product.name}</span>
            </div>
            
            <div className="product-field">
              <div className="field-label">ID</div>
              <div className="field-value">{product.id}</div>
            </div>
            
            <div className="product-field">
              <div className="field-label">Price</div>
              <div className="field-value product-price">{product.price}</div>
            </div>
            
            <div className="product-field">
              <div className="field-label">Status</div>
              <div
                className="field-value product-status"
                style={{ color: getStatusColor(product.traking) }}
              >
                {product.traking}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delivery;
