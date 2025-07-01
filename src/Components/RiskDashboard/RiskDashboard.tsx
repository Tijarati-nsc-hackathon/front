"use client"
import "./RiskDashboard.css";
import { riskData,clients } from "./data";
import { useRef } from "react";
import Image from "../assets/About.png"

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

const createDonutPath = (
  startAngle: number,
  endAngle: number,
  innerR: number,
  outerR: number
) => {
  const start = polarToCartesian(0, 0, outerR, endAngle)
  const end = polarToCartesian(0, 0, outerR, startAngle)
  const innerStart = polarToCartesian(0, 0, innerR, endAngle)
  const innerEnd = polarToCartesian(0, 0, innerR, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1

  return [
    "M", start.x, start.y,
    "A", outerR, outerR, 0, largeArc, 0, end.x, end.y,
    "L", innerEnd.x, innerEnd.y,
    "A", innerR, innerR, 0, largeArc, 1, innerStart.x, innerStart.y,
    "Z",
  ].join(" ")
}

export default function RiskDonutChart() {
  const total = riskData.reduce((sum, item) => sum + item.value, 0)
  const angleRef = useRef(0)

  return (
    <div className="dashboard-container">
      {/* Risk Donut Chart */}
      <div className="card chart-card">
        <h2 className="title">Expressing the Risk</h2>
        <div className="donut-wrapper">
          <svg width="200" height="200" viewBox="-100 -100 200 200">
            {riskData.map((slice, i) => {
              const pct = slice.value / total
              const angle = pct * 360
              const path = createDonutPath(angleRef.current, angleRef.current + angle, 40, 80)
              angleRef.current += angle
              return (
                <path key={i} d={path} fill={slice.color} stroke="white" strokeWidth="2" />
              )
            })}
          </svg>
        </div>
        <div className="legend">
          {riskData.map((slice, i) => (
            <div key={i} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: slice.color }}></span>
              <span>{slice.label}</span>
            </div>
          ))}
        </div>
      </div>

        {/* Client List */}
      <div className="card client-card">
        <h2 className="title">Clients with Risk</h2>
        <div className="client-list">
          {clients.map((client, i) => (
            <div className="client-row" key={i}>
              <div className="client-info">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="avatar"
                  width={48}
                  height={48}
                  className="avatar"
                />
                <div>
                  <div className="client-name">{client.name}</div>
                  <div className="client-device">{client.device}</div>
                </div>
              </div>
              <span
                className="risk-badge"
                style={{ backgroundColor: client.riskColor }}
              >
                {client.risk}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
