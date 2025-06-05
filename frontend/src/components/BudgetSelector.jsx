import React from "react";

export default function BudgetSelector({
  budgets,
  selectedBudgetId,
  onChange,
  onDelete
}) {
  return (
    <div className="dashboard-controls">
      <select value={selectedBudgetId} onChange={onChange}>
        {budgets.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      {budgets.length > 0 && (
        <button onClick={onDelete} className="delete-button">
          Delete Budget
        </button>
      )}
    </div>
  );
}
