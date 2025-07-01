import React, { useState } from "react";
import { useApiQuery } from "../../api/useApiCall";
import "./OrderList.css";

export type OrderType = {
  id: number;
  customerName: string;
  product: string;
  date: string;
  deliveryAgency: string;
  paymentStatus: string;
  contactMethod: string;
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

const LastOrders: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useApiQuery<PaginatedResponseDto<OrderType>>(
    ["orders-paginated", page, limit],
    "/orders/paginated",
    { page, limit }
  );

  return (
    <div className="last-orders-container">
      {/* Header */}
      <div className="last-orders-header">
        <h3 className="last-orders-title">List of last orders</h3>
        <button className="add-order-btn">+ Add New Order</button>
      </div>

      {/* Loading / Error states */}
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          Error loading orders
          {error instanceof Error ? `: ${error.message}` : ""}
        </div>
      )}

      {/* Orders list */}
      <div className="orders-list">
        {data?.data?.map((order) => (
          <div key={order.id} className="order-item">
            <div className="customer-info">
              <span className="customer-name">{order.customerName}</span>
            </div>
            <span className="order-product">{order.product}</span>
            <span className="order-date">{order.date}</span>
            <span className="order-delivery-agency">{order.deliveryAgency}</span>
            <span className="order-payment-status status-paid">
              {order.paymentStatus}
            </span>
            <button className="whatsapp-btn">
              {/* SVG icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="whatsapp-icon"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..." />
              </svg>
              WhatsApp
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data && (
        <div className="pagination-controls">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {data.meta.page} of {data.meta.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
            disabled={page === data.meta.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LastOrders;
