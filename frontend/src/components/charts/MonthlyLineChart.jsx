import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import API from "../../services/api";

// Utility to convert numeric month to readable format
const formatMonth = (year, month) => {
  const date = new Date(year, month - 1); // JS months are 0-indexed
  return `${date.toLocaleString("default", { month: "short" })} ${year}`;
};

export default function MonthlyLineChart({ budgetId, type = "EXPENSE", refreshKey }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!budgetId) return;

    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await API.get(
          `/api/budgets/${budgetId}/analytics/month?type=${type}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const chartData = response.data.map(item => ({
          name: formatMonth(item.year, item.month),
          total: item.total
        }));

        setMonthlyData(chartData);
        setError("");
      } catch (err) {
        setError("Failed to load monthly data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [budgetId, type, refreshKey]);

  if (loading) {
    return <div className="text-gray-500 text-center">Loading monthly chart...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (monthlyData.length === 0) {
    return <div className="text-gray-500 text-center">No data available</div>;
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {type === "INCOME" ? "Income" : "Expenses"} Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
