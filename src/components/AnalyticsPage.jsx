import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import { getAnalyticsData } from "../services/profileService";

function AnalyticsPage() {
  const [deviceData, setDeviceData] = useState(null);
  const [linksData, setLinksData] = useState(null);
  const [referrerData, setReferrerData] = useState(null);
  const [timeData, setTimeData] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await getAnalyticsData();
        setDeviceData({
          labels: ["Desktop", "Mobile", "Tablet"],
          datasets: [
            {
              label: "test 1",
              data: [
                res.deviceClicks.Desktop,
                res.deviceClicks.Mobile,
                res.deviceClicks.Tablet,
              ],
              backgroundColor: ["#66BB6A", "#42A5F5", "#FFCA28"],
            },
          ],
        });
        const allLinksData = [...res.linksData, ...res.shopsData];
        const linksLabel = allLinksData.map((link) => link.name);
        const linksClicks = allLinksData.map((link) => link.clicks);

        setLinksData({
          labels: linksLabel,
          datasets: [
            {
              label: "Link Clicks",
              data: linksClicks,
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFCA28", "#FF7043"],
            },
          ],
        });
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        console.log({ monthly: res.monthlyClicks });
        setTimeData({
          labels: monthNames.slice(0, res.monthlyClicks.length),
          datasets: [
            {
              label: "Monthly Clicks",
              data: res.monthlyClicks,
              backgroundColor: "#42A5F5",
            },
          ],
        });
      } catch (error) {
        console.log("in this analytics console");
        console.error(error);
      }
    }

    fetchAnalytics();
  }, []);

  console.log({ timeData });

  useEffect(() => {
    console.log("Device Data:", deviceData);
    console.log("Referrer Data:", referrerData);
    console.log("Time Data:", timeData);
  }, [deviceData, referrerData, timeData]);

  console.log({ linksData });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Overview</h2>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        {/* line chart */}
        <div style={{ width: "400px", height: "300px" }}>
          {timeData && <Line data={timeData} />}
        </div>

        <div style={{ width: "400px", height: "300px" }}>
          {linksData && <Bar data={linksData} />}
        </div>

        <div style={{ width: "400px", height: "300px" }}>
          {deviceData && <Bar data={deviceData} />}
        </div>
      </div>

      {/* bar chart */}
      <div style={{ width: "400px", height: "300px" }}>
        {referrerData && <Bar data={referrerData} />}
      </div>
    </div>
  );
}

export default AnalyticsPage;
