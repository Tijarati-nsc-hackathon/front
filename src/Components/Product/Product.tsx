import React, { useState, useEffect } from "react";
import {
  Eye,
  Star,
  Minus,
  Plus,
  Truck,
  Calendar,
  Sparkle,
  X,
} from "lucide-react"; // Changed MessageSquareDot to Sparkle
import "./Product.css";
import BuyConfirmationModal from "../Modals/BuyModal";
import p1 from "../assets/pyjama1.webp";
import p2 from "../assets/Piyama2.webp";
import p3 from "../assets/Pyjama3.webp";
import p4 from "../assets/Pyjama4.webp";

export interface ProductData {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  stock: number;
  viewers: number;
}

const Product: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false); // State to control AI chat visibility
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 5,
    minutes: 59,
    seconds: 47,
  });

  // ─────────────────────────────────────────────
  // Mock product (replace with API / props later)
  // ─────────────────────────────────────────────
  const productData: ProductData = {
    id: "1",
    name: "Maggie Pyjama Set - Long - Wild Flower",
    brand: "ZARA",
    price: 4500.0,
    originalPrice: 6000.0,
    discount: 5,
    rating: 4,
    reviewsCount: 4,
    images: [p1, p2, p3, p4],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "beige", hex: "#C4A484" },
      { name: "black", hex: "#000000" },
      { name: "pink", hex: "#F4C2C2" },
    ],
    stock: 9,
    viewers: 24,
  };

  // Initialize default size & color
  useEffect(() => {
    if (productData.sizes.length && !selectedSize)
      setSelectedSize(productData.sizes[0]);
    if (productData.colors.length && !selectedColor)
      setSelectedColor(productData.colors[0].name);
  }, [productData, selectedSize, selectedColor]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ───── Handlers ──────────────────────────────
  const handleAddToCart = () => setShowBuyPopup(true);
  const handleTalkWithAI = () => setIsAIChatOpen(true);
  const handleCloseAI = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the parent div's onClick from re-opening
    setIsAIChatOpen(false);
  };

  // ───── JSX ───────────────────────────────────
  return (
    <div className={`product-page ${isAIChatOpen ? "ai-chat-open-body" : ""}`}>
      {" "}
      {/* Add a class to body if AI is open */}
      <div className="product-container">
        {/* ------------ Image Gallery ------------ */}
        <div className="image-gallery">
          <div className="thumbnail-list">
            {productData.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`Product view ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="main-image-container">
            <div className="main-image">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
              />
            </div>

            <div className="shipping-info">
              {" "}
              {/* Added wrapper for shipping items */}
              <div className="shipping-item">
                <Calendar size={16} className="shipping-icon" />
                <span>
                  <strong>Estimated Delivery:</strong> Jul 30 – Aug 03
                </span>
              </div>
              <div className="shipping-item">
                <Truck size={16} className="shipping-icon" />
                <span>
                  <strong>Free Shipping & Returns:</strong> On all orders over
                  10000.00DA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------ Product Details ---------- */}
        <div className="product-details">
          <div className="brand">{productData.brand}</div>
          <h1 className="product-title">{productData.name}</h1>

          <div className="rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`star ${
                    star <= productData.rating ? "filled" : ""
                  }`}
                />
              ))}
            </div>
            <span className="rating-text">({productData.reviewsCount})</span>
          </div>

          <div className="price-section">
            <span className="current-price">
              {productData.price.toFixed(2)}DA
            </span>
            <span className="original-price">
              {productData.originalPrice.toFixed(2)}DA
            </span>
            <span className="discount-badge">SAVE {productData.discount}%</span>
          </div>

          <div className="viewers">
            <Eye size={16} />
            <span>{productData.viewers} people are viewing this right now</span>
          </div>

          {/* Countdown */}
          <div className="countdown countdown-bar">
            <span className="countdown-text">Hurry up! Sale ends in:</span>
            <div className="countdown-timer">
              {(["days", "hours", "minutes", "seconds"] as const).map(
                (unit) => (
                  <div className="time-unit" key={unit}>
                    <span className="time-number">
                      {String(timeLeft[unit]).padStart(2, "0")}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="stock-info">
            <div className="stock-bar">
              <div
                className="stock-fill"
                style={{ width: `${(productData.stock / 50) * 100}%` }}
              />
            </div>
            <span className="stock-text">
              Only {productData.stock} item(s) left in stock!
            </span>
          </div>

          {/* Size, color, quantity */}
          <div className="product-options">
            <div className="size-section">
              <label>Size: {selectedSize}</label>
              <div className="size-options">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="color-section">
              <label>Color: {selectedColor}</label>
              <div className="color-options">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-btn ${
                      selectedColor === color.name ? "active" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <button className="buy-button" onClick={handleAddToCart}>
            Buy
          </button>
        </div>
      </div>
      {/* --------- Buy Confirmation Modal -------- */}
      {showBuyPopup && (
        <BuyConfirmationModal onClose={() => setShowBuyPopup(false)} />
      )}
      {/* ----------- Floating AI Chat / Fullpage AI ------------ */}
      <div
        className={`ai-chat-wrapper ${
          isAIChatOpen ? "ai-chat-wrapper-open" : ""
        }`}
      >
        {isAIChatOpen ? (
          <div className="ai-chat-fullpage">
            <button className="ai-chat-close-btn" onClick={handleCloseAI}>
              <X size={24} />
            </button>
            <h1 className="ai-chat-title">How can I help you today?</h1>
            <div className="ai-chat-content">
              {/* This is where your AI chat messages and input would go */}
              <p>
                Hello! I'm your AI assistant. Feel free to ask me anything about
                this product or your order.
              </p>
              <div className="ai-chat-message ai-chat-message-user">
                <span>
                  What are the washing instructions for this moccasin?
                </span>
              </div>
              <div className="ai-chat-message ai-chat-message-ai">
                <span>
                  These moccasins are made of serraje (suede). We recommend
                  cleaning them with a specialized suede brush and avoiding
                  direct contact with water. For stubborn stains, use a suede
                  cleaner.
                </span>
              </div>
              <div className="ai-chat-message ai-chat-message-user">
                <span>Can I return them if they don't fit?</span>
              </div>
              <div className="ai-chat-message ai-chat-message-ai">
                <span>
                  Yes, we offer free shipping and returns on all orders over
                  10000.00DA. Please refer to our returns policy for more
                  details on the process.
                </span>
              </div>
            </div>
            <div className="ai-chat-input-area">
              <input
                type="text"
                placeholder="Type your message..."
                className="ai-chat-input"
              />
              <button className="ai-chat-send-btn">Send</button>
            </div>
          </div>
        ) : (
          <button className="ai-chat-button" onClick={handleTalkWithAI}>
            <span className="ai-chat-button-text">Talk with AI</span>
            <Sparkle size={24} className="ai-chat-sparkle-icon" />{" "}
            {/* Main Sparkle Icon */}
            {/* Adding a second sparkle for visual effect as seen in some similar designs */}
            <Sparkle
              size={18}
              className="ai-chat-sparkle-icon second-sparkle"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
