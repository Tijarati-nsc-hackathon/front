import React from "react";
import "./DeleteProductModal.css";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName?: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  productName = "this product",
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-modal-title">Delete Product</h2>
        <p className="delete-modal-text">
          Are you sure you want to delete <strong>{productName}</strong>?
          <br />
          This action cannot be undone.
        </p>
        <div className="delete-modal-actions">
          <button className="cancel-delete-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
