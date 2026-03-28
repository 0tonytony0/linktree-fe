import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { getAnalyticsData } from "../services/profileService";
import "../styles/analytics.css";

// Chart.js global defaults
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AnalyticsPage() {
  const [deviceData, setDeviceData] = useState(null);
  const [linksData, setLinksData] = useState(null);
  const [timeData, setTimeData] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await getAnalyticsData();

        // 1. Device Analytics - Refined Emerald Palette
        setDeviceData({
          labels: ["Desktop", "Mobile", "Tablet"],
          datasets: [
            {
              label: "Usage by Device",
              data: [
                res.deviceClicks?.Desktop || 0,
                res.deviceClicks?.Mobile || 0,
                res.deviceClicks?.Tablet || 0,
              ],
              backgroundColor: ["#28A263", "#4ADE80", "#DCFCE7"],
              borderRadius: 6,
            },
          ],
        });

        // 2. Links & Shops Analytics
        const allLinksData = [...(res.linksData || []), ...(res.shopsData || [])];
        setLinksData({
          labels: allLinksData.map((link) => link.name),
          datasets: [
            {
              label: "Total Clicks",
              data: allLinksData.map((link) => link.clicks),
              backgroundColor: "#28A263",
              borderRadius: 6,
            },
          ],
        });

        // 3. Time Series Analytics
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setTimeData({
          labels: monthNames.slice(0, res.monthlyClicks?.length || 0),
          datasets: [
            {
              label: "Monthly Performance",
              data: res.monthlyClicks || [],
              borderColor: "#28A263",
              backgroundColor: "rgba(40, 162, 99, 0.1)",
              fill: true,
              tension: 0.4,
              pointRadius: 5,
              pointHoverRadius: 8,
              pointBackgroundColor: "#28A263",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    }

    fetchAnalytics();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111827",
        titleFont: { family: "Poppins", size: 13, weight: "700" },
        bodyFont: { family: "Poppins", size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0,0,0,0.04)",
          drawBorder: false,
        },
        ticks: { 
          font: { family: "Poppins", size: 11 },
          color: "#6B7280"
        },
      },
      x: {
        grid: { display: false },
        ticks: { 
          font: { family: "Poppins", size: 11 },
          color: "#6B7280"
        },
      },
    },
  };

  return (
    <div className="analytics-container">
      <h2>Analytics Insights</h2>

      <div className="analytics-summary">
        {/* Monthly Performance (Line Chart) */}
        <div className="chart-card">
          <h3>📈 Monthly Performance</h3>
          <div className="chart-wrapper">
            {timeData ? <Line data={timeData} options={chartOptions} /> : <p>Loading Analytics...</p>}
          </div>
        </div>

        {/* Link Clicks (Bar Chart) */}
        <div className="chart-card">
          <h3>🔗 Most Clicked Links</h3>
          <div className="chart-wrapper">
            {linksData ? <Bar data={linksData} options={chartOptions} /> : <p>Loading Analytics...</p>}
          </div>
        </div>

        {/* Device Usage (Bar Chart) */}
        <div className="chart-card">
          <h3>📱 Usage by Device</h3>
          <div className="chart-wrapper">
            {deviceData ? <Bar data={deviceData} options={chartOptions} /> : <p>Loading Analytics...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
