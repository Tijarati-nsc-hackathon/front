import React, { useState } from "react";
import { ChevronDown, Layers3 } from "lucide-react";
import Sidebar from "../Components/Sidebar/Sidebar.tsx";
import Dah from "../Components/Dashboard/Dash.tsx";
import Section from "../Components/Section/Section.tsx"; // Import the renamed Section component
import "./CSS/Dashboard.css";
import DashboardCharts from "../Components/DashboardCharts/DashboardCharts.tsx";
import image from "../Components/assets/dashboard_image.png";
import OrderList from "../Components/OrderList/OrderList.tsx";
import Preferences from "../Components/Preferences/Preferences.tsx";
import UserProfileForm from "../Components/UserProfile/UserProfile.tsx"; // Import your profile form
import ProductList from "../Components/Products/ProductList.tsx";
import Delivery from "../Components/Delivery/Delivery.tsx";
import RiskDashboard from "../Components/RiskDashboard/RiskDashboard.tsx";

interface DashboardProps {
  // Add any props you need for the dashboard
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [activeSection, setActiveSection] = useState<string>("Dashboard");
  const [selectedMarket, setSelectedMarket] = useState("Market 1");
  const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false);

  const markets = ["Market 1", "Market 2", "Market 3", "Market 4"];

  const handleSidebarItemClick = (itemName: string): void => {
    setActiveSection(itemName);
    console.log(`Navigating to: ${itemName}`);
    // Here you can add routing logic or state management
  };

  const handleProfileClick = (): void => {
    setActiveSection("Profile");
    console.log("Navigating to Profile");
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
            {/* Render the Dah component for summary cards */}
            <Dah />
            <DashboardCharts />
            <Section />
            {/* Original content, you might want to remove or integrate this */}
            {/* <h1>Dashboard Overview</h1>
            <p>Welcome to your main dashboard!</p> */}
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
          {/* Left side: Current Section Title */}
          <h2 className="dashboard__header-title">
            {activeSection === "Dashboard" ? (
              <>
                <span className="dashboard-title-highlight">Dashboard</span>
              </>
            ) : (
              // Wrapped activeSection in a span for consistent styling
              <span className="dashboard-title-highlight">{activeSection}</span>
            )}
          </h2>

          {/* Right side: Search, Icons, Profile */}
          <div className="dashboard__header-right">
            <div className="search-bar">
              {/* Replaced emoji with an inline SVG for a yellow search icon */}
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search for something"
                className="search-input"
              />
            </div>
            <div className="header-icons">
              <div className="icon-button">⚙️</div> {/* Settings icon */}
              <div className="icon-button">🔔</div> {/* Notification icon */}
            </div>
            <div className="user-profile" onClick={handleProfileClick}>
              <img src={image} alt="User Profile" className="profile-picture" />{" "}
              {/* Profile picture */}
            </div>
          </div>
        </header>

        {/* Market Selector below header */}
        <div
          style={{
            padding: "1rem 2rem",
            // backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ position: "relative", width: "fit-content" }}>
            <button
              onClick={() => setIsMarketDropdownOpen(!isMarketDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                backgroundColor: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                minWidth: "200px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "14px",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 1px 3px rgba(0, 0, 0, 0.1)";
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
                  transform: isMarketDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {isMarketDropdownOpen && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "8px",
                    backgroundColor: "white",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    zIndex: 50,
                    overflow: "hidden",
                    marginBottom: 0,
                  }}
                >
                  {markets.map((market, index) => (
                    <button
                      key={index}
                      onClick={() => handleMarketSelect(market)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        textAlign: "left",
                        border: "none",
                        backgroundColor:
                          selectedMarket === market ? "#eff6ff" : "white",
                        color:
                          selectedMarket === market ? "#2563eb" : "#374151",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "background-color 0.15s",
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
                      <Layers3 size={16} color="#9ca3af" />
                      <span>{market}</span>
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 40,
                    backgroundColor: "transparent", // Add this line
                  }}
                  onClick={() => setIsMarketDropdownOpen(false)}
                />
              </>
            )}
          </div>
        </div>

        <div className="dashboard__body">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
