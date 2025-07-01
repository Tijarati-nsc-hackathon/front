import React, { useState } from "react";
import { useApiQuery } from '../../api/useApiCall';
import "./OrderList.css"; // Import the CSS for this component

// Define the type for a single order (matching orders.tsx)
export type OrderType = {
  id: number;
  customerName: string;
  product: string;
  date: string;
  deliveryAgency: string;
  paymentStatus: string;
  contactMethod: string;
};

// Define the paginated response type
interface PaginatedResponseDto<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const LastOrders: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useApiQuery<PaginatedResponseDto<OrderType>>(
    ["orders-paginated", page, limit],
    `/orders/paginated`,
    { page, limit }
  );

  return (
    <div className="last-orders-container">
      <h3 className="last-orders-title">List of last orders</h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading orders{error instanceof Error ? `: ${error.message}` : ''}</div>}
      <div className="orders-list">
        {data?.data?.map((order) => (
          <div key={order.id} className="order-item">
            <div className="customer-info">
              <span className="customer-name">{order.customerName}</span>
            </div>
            <span className="order-product">{order.product}</span>
            <span className="order-date">{order.date}</span>
            <span className="order-delivery-agency">
              {order.deliveryAgency}
            </span>
            <span className="order-payment-status status-paid">
              {order.paymentStatus}
            </span>{" "}
            {/* Add status class */}
            <a href="#" className="order-contact-method contact-whatsapp">
              {order.contactMethod}
            </a>{" "}
            {/* Add contact class */}
          </div>
        ))}
      </div>
      {/* Pagination controls (optional) */}
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

export default LastOrders;
