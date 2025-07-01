import React, { useState } from "react";
import { ChevronDown, Layers3 } from "lucide-react";
import Sidebar from "../Components/Sidebar/Sidebar.tsx";
import Dah from "../Components/Dashboard/Dash.tsx";
import Section from "../Components/Section/Section.tsx";
import "./CSS/Dashboard.css";
import DashboardCharts from "../Components/DashboardCharts/DashboardCharts.tsx";
import image from "../Components/assets/dashboard_image.png";
import OrderList from "../Components/OrderList/OrderList.tsx";
import Preferences from "../Components/Preferences/Preferences.tsx";
import UserProfileForm from "../Components/UserProfile/UserProfile.tsx";
import ProductList from "../Components/Products/ProductList.tsx";
import Delivery from "../Components/Delivery/Delivery.tsx";
import RiskDashboard from "../Components/RiskDashboard/RiskDashboard.tsx";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [activeSection, setActiveSection] = useState<string>("Dashboard");
  const [selectedMarket, setSelectedMarket] = useState("Market 1");
  const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const markets = ["Market 1", "Market 2", "Market 3", "Market 4"];

  const handleSidebarItemClick = (itemName: string): void => {
    setActiveSection(itemName);
    console.log(`Navigating to: ${itemName}`);
  };

  const handleProfileClick = (): void => {
    setActiveSection("Profile");
  };

  const handleSettingsClick = (): void => {
    setActiveSection("Setting");
  };

  const handleNotificationClick = (): void => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  const handleMarketSelect = (market: string) => {
    setSelectedMarket(market);
    setIsMarketDropdownOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="dashboard__content">
            <Dah />
            <DashboardCharts />
            <Section />
          </div>
        );
      case "Orders":
        return (
          <div className="dashboard__content">
            <OrderList />
          </div>
        );
      case "Delivery Insights":
        return (
          <div className="dashboard__content">
            <RiskDashboard />
          </div>
        );
      case "Products":
        return (
          <div className="dashboard__content">
            <ProductList />
          </div>
        );
      case "Track Delivery":
        return (
          <div className="dashboard__content">
            <Delivery />
          </div>
        );
      case "Setting":
        return (
          <div className="dashboard__content">
            <h1>Preferences</h1>
            <Preferences />
          </div>
        );
      case "Profile":
        return (
          <div className="dashboard__content">
            <UserProfileForm />
          </div>
        );
      default:
        return (
          <div className="dashboard__content">
            <h1>Dashboard</h1>
            <p>Select a section from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onItemClick={handleSidebarItemClick} />
      <main className="dashboard__main">
        <header className="dashboard__header">
          <h2 className="dashboard__header-title">
            <span className="dashboard-title-highlight">{activeSection}</span>
          </h2>

          <div className="dashboard__header-right">
            <div className="search-bar">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search for something" className="search-input" />
            </div>
            <div className="header-icons">
              <div className="icon-button" onClick={handleSettingsClick}>⚙️</div>
              <div className="icon-button" onClick={handleNotificationClick}>🔔</div>
            </div>
            <div className="user-profile" onClick={handleProfileClick}>
              <img src={image} alt="User Profile" className="profile-picture" />
            </div>
          </div>
        </header>

        <div style={{ padding: "1rem 2rem", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ position: "relative", width: "fit-content" }}>
            <button
              onClick={() => setIsMarketDropdownOpen(!isMarketDropdownOpen)}
              style={{
                display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px",
                backgroundColor: "white", border: "2px solid #e5e7eb", borderRadius: "12px",
                minWidth: "200px", cursor: "pointer", transition: "all 0.2s", fontSize: "14px", fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Layers3 size={20} color="#6b7280" />
              <span style={{ color: "#1f2937", flex: 1, textAlign: "left" }}>
                {selectedMarket}
              </span>
              <ChevronDown
                size={20}
                color="#6b7280"
                style={{
                  transform: isMarketDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }}
              />
            </button>

            {isMarketDropdownOpen && (
              <>
                <div style={{
                  position: "absolute", top: "100%", left: 0, right: 0, marginTop: "8px",
                  backgroundColor: "white", border: "2px solid #e5e7eb", borderRadius: "12px",
                  zIndex: 50, overflow: "hidden", marginBottom: 0
                }}>
                  {markets.map((market, index) => (
                    <button
                      key={index}
                      onClick={() => handleMarketSelect(market)}
                      style={{
                        width: "100%", padding: "12px 16px", textAlign: "left", border: "none",
                        backgroundColor: selectedMarket === market ? "#eff6ff" : "white",
                        color: selectedMarket === market ? "#2563eb" : "#374151", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", fontWeight: "500"
                      }}
                      onMouseEnter={(e) => {
                        if (selectedMarket !== market) {
                          e.currentTarget.style.backgroundColor = "#f9fafb";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedMarket !== market) {
                          e.currentTarget.style.backgroundColor = "white";
                        }
                      }}
                    >
                      <Layers3 size={22} color="#9ca3af" />
                      <span>{market}</span>
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 40, backgroundColor: "transparent"
                  }}
                  onClick={() => setIsMarketDropdownOpen(false)}
                />
              </>
            )}
          </div>
        </div>

        <div className="dashboard__body">{renderContent()}</div>
      </main>

      {/* Notification Popup */}
      {showNotificationPopup && (
        <div className="notification-popup-overlay" onClick={() => setShowNotificationPopup(false)}>
          <div className="notification-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="notification-popup-header">
              <h3>Notifications</h3>
              <button className="notification-popup-close" onClick={() => setShowNotificationPopup(false)}>
                &times;
              </button>
            </div>
            <div className="notification-popup-body">
              <p>New order received! #ORD12345</p>
              <p>Your product "MOCASSINS SERRAJE" has been shipped.</p>
              <p>System update scheduled for tomorrow at 2 AM.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
