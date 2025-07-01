import React, { useState } from "react";
import { products } from "./ProductData.tsx";
import "./ProductList.css";
import EditProductModal from "../Modals/EditProductModal.tsx";
import DeleteProductModal from "../Modals/DeleteProductModal";

const ProductList: React.FC = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = (product: any) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

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

            {/* Actions Section */}
            <div className="product-field">
              {/* <div className="field-label">Actions</div> */}
              <div className="product-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(product)}
                  title="Edit Product"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(product)}
                  title="Delete Product"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
                       
          </div>
        ))}
      </div>

      {/* Modals */}
      {editModalOpen && (
        <EditProductModal
          product={selectedProduct}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedProduct) => {
            // Handle save logic here
            console.log('Updated product:', updatedProduct);
            setEditModalOpen(false);
          }}
        />
      )}

      {deleteModalOpen && (
        <DeleteProductModal
          product={selectedProduct}
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            // Handle delete logic here
            console.log('Deleted product:', selectedProduct);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;