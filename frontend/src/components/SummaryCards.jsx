import React from "react";

export default function SummaryCards({ summary }) {
  return (
    <div className="dashboard-summary">
      <div className="dashboard-card">
        <div>Total Income</div>
        <div>{summary ? `$${summary.totalIncome}` : "--"}</div>
      </div>
      <div className="dashboard-card">
        <div>Total Expenses</div>
        <div>{summary ? `$${summary.totalExpense}` : "--"}</div>
      </div>
      <div className="dashboard-card">
        <div>Remaining Budget</div>
        <div>{summary ? `$${summary.balance}` : "--"}</div>
      </div>
    </div>
  );
}
