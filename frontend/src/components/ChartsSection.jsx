import React from "react";
import ExpensePieChart from "./charts/ExpensePieChart";
import MonthlyLineChart from "./charts/MonthlyLineChart";

export default function ChartsSection({ budgetId, refreshKey }) {
  if (!budgetId) return null;

  return (
    <div className="dashboard-charts">
      <div className="dashboard-chart">
        <ExpensePieChart budgetId={budgetId} refreshKey={refreshKey} />
      </div>
      <MonthlyLineChart budgetId={budgetId} refreshKey={refreshKey} />
    </div>
  );
}
