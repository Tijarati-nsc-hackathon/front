import React from "react";
import { products } from "./ProductData.tsx";
import "./ProductList.css";

const ProductList: React.FC = () => {
  return (
    <div className="product-list-container">
      <h3 className="product-list-title">Product Inventory</h3>
      
      <div className="products-list">
        {products?.map((product, index) => (
          <div key={`${product.id}-${index}`} className="product-item">
            
            {/* Product Info Section */}
            <div className="product-info">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <span className="product-name">{product.name}</span>
            </div>
            
            {/* ID Section */}
            <div className="product-field">
              <div className="field-label">ID</div>
              <div className="field-value">{product.id}</div>
            </div>
            
            {/* Price Section */}
            <div className="product-field">
              <div className="field-label">Price</div>
              <div className="field-value product-price">{product.price}</div>
            </div>
            
            {/* Stock Status Section */}
            <div className="product-field">
              <div className="field-label">Stock Status</div>
              <div className={`field-value stock-status ${product.stockColor === 'green' ? 'stock-in' : 'stock-out'}`}>
                {product.stockStatus}
              </div>
            </div>
            
            {/* Total Orders Section */}
            <div className="product-field">
              <div className="field-label">Total Orders</div>
              <div className="field-value">{product.totalOrders}</div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;