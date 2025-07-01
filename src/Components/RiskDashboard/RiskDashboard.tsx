import React, { useState } from "react";
import { ChevronLeft, ChevronRight,User } from "lucide-react";
import { riskData, clients } from "./data";
import "./RiskDashboard.css";

interface Client {
  id: string;
  name: string;
  device: string;
  riskLevel: "high" | "medium" | "low";
}

interface RiskData {
  high: number;
  medium: number;
  low: number;
  total: number;
}

interface RiskDashboardProps {
  clients?: Client[];
  riskData?: RiskData;
}

/* ------------------------------------------------------------------ */
/*                         HELPER FUNCTIONS                            */
/* ------------------------------------------------------------------ */
const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const createDonutPath = (
  startAngle: number,
  endAngle: number,
  innerR: number,
  outerR: number
) => {
  const start = polarToCartesian(0, 0, outerR, endAngle);
  const end = polarToCartesian(0, 0, outerR, startAngle);
  const innerStart = polarToCartesian(0, 0, innerR, endAngle);
  const innerEnd = polarToCartesian(0, 0, innerR, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    outerR,
    outerR,
    0,
    largeArc,
    0,
    end.x,
    end.y,
    "L",
    innerEnd.x,
    innerEnd.y,
    "A",
    innerR,
    innerR,
    0,
    largeArc,
    1,
    innerStart.x,
    innerStart.y,
    "Z",
  ].join(" ");
};

const RiskDashboard: React.FC<RiskDashboardProps> = ({
  clients: inputClients = clients,
  riskData: inputRisk = riskData,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const clientsPerPage = 3;

  const totalPages = Math.ceil(inputClients.length / clientsPerPage);
  const currentClients = inputClients.slice(
    currentPage * clientsPerPage,
    currentPage * clientsPerPage + clientsPerPage
  );

  const circumference = 2 * Math.PI * 65;
  const { high, medium, low, total } = inputRisk;
  const seg = {
    high: (high / total) * circumference,
    medium: (medium / total) * circumference,
    low: (low / total) * circumference,
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  const riskBadge = (level: Client["riskLevel"]) =>
    `risk-badge ${level}`;

  return (
    <div className="dashboard-container">
      {/* Donut card ------------------------------------------------ */}
      <div className="card risk-card">
        <h2 className="card-title">Expressing the risk</h2>

        <div className="donut-wrapper">
          <svg viewBox="-100 -100 200 200" className="donut-svg">
            <path
              d={createDonutPath(0,   (high / total) * 360, 40, 80)}
              className="donut-segment high"
              strokeDasharray={`${seg.high} ${circumference}`}
            />
            <path
              d={createDonutPath((high / total) * 360,
                                 ((high + medium) / total) * 360,
                                 40, 80)}
              className="donut-segment medium"
              strokeDasharray={`${seg.medium} ${circumference}`}
            />
            <path
              d={createDonutPath(((high + medium) / total) * 360, 360, 40, 80)}
              className="donut-segment low"
              strokeDasharray={`${seg.low} ${circumference}`}
            />
          </svg>

          <div className="legend">
            <span><i className="dot high" /> High Risk</span>
            <span><i className="dot medium" /> Medium Risk</span>
            <span><i className="dot low" /> Low Risk</span>
          </div>
        </div>
      </div>

      {/* Client list card ------------------------------------------ */}
      <div className="card client-card">
        <div className="client-header">
          <h2 className="card-title">Client with risk</h2>

          {totalPages > 1 && (
            <div className="pager">
              <button onClick={handlePrev} disabled={currentPage === 0}>
                <ChevronLeft size={16} />
              </button>
              <span>{currentPage + 1} / {totalPages}</span>
              <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="client-list">
          {currentClients.map(({ id, name, device, riskLevel }) => (
            <div key={id} className="client-item">
              <div className="client-info">
                <div className="avatar">
                  <User size={24} className="avatar-icon" /> {/* Added User icon */}
                </div>
                <div>
                  <div className="client-name">{name}</div>
                  <div className="device">{device}</div>
                </div>
              </div>
              <div className={riskBadge(riskLevel)}>
                {riskLevel === "high" ? "High Risk" : riskLevel === "medium" ? "Medium Risk" : "Low Risk"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskDashboard;