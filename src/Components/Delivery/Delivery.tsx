// Delivery.tsx
import React, { useState } from "react";
import { useApiQuery } from '../../api/useApiCall';
import "./Delivery.css";
// import { PaginatedResponseDto } from 'path-to-type-if-available';

export type ProductInventoryType = {
  id: string;
  name: string;
  image: string;
  orderStatus: string;
  price: string;
};

interface PaginatedResponseDto<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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
  const [page, setPage] = useState(1);
  const limit = 10;
  const shopId = '920046e6-be39-408b-9742-b783dc71ee2b'; 

  const { data, isLoading, error } = useApiQuery<PaginatedResponseDto<ProductInventoryType>>(
    ["orders-inventory", page, limit, shopId],
    `/orders/inventory`,
    { page, limit, shopId }
  );

  return (
    <div className="product-list-container">
      <h3 className="product-list-title">Product Inventory</h3>
      {isLoading && <div>Loading...</div>}
      {Boolean(error) && <div>Error loading inventory{error instanceof Error ? `: ${error.message}` : ''}</div>}
      <div className="products-list">
        {data?.data?.map((product, index) => (
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
                style={{ color: getStatusColor(product.orderStatus) }}
              >
                {product.orderStatus}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      {data && (
        <div className="pagination-controls">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {data.meta.page} of {data.meta.totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))} disabled={page === data.meta.totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Delivery;
