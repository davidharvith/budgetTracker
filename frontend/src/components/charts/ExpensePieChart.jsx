import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import API from "../../services/api";

// Color palette for the pie chart
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C',
  '#8DD1E1', '#D084D0', '#87D068', '#FFA07A'
];

export default function ExpensePieChart({ budgetId, refreshKey }) {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!budgetId) return;
    
    const fetchExpenseData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await API.get(
          `/api/budgets/${budgetId}/analytics/category?type=EXPENSE`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Transform the data for Recharts
        const chartData = response.data.map((item, index) => ({
          name: item.category,
          value: item.total,
          color: COLORS[index % COLORS.length]
        }));
        
        setExpenseData(chartData);
        setError("");
      } catch (err) {
        setError("Failed to load expense data");
        console.error("Error fetching expense data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseData();
  }, [budgetId, refreshKey]);

  // Custom tooltip to show currency
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{data.payload.name}</p>
          <p className="text-blue-600">${data.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label function to show percentages
  const renderLabel = (entry) => {
    const total = expenseData.reduce((sum, item) => sum + item.value, 0);
    const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
    return `${percent}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading expense data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (expenseData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No expense data available</div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-[900px]">
      <h3 className="text-lg font-semibold mb-4 text-center">Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={(value, entry) => `${value}: $${entry.payload.value.toFixed(2)}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}