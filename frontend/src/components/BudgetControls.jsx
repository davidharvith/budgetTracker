import React, { useState } from "react";
import BudgetForm from "./BudgetForm";

export default function BudgetControls({
  budgets,
  selectedBudgetId,
  onSelectBudget,
  onDeleteBudget,
  onCreateBudget,
  createError,
}) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => setShowCreateForm((prev) => !prev);

  return (
    <div className="dashboard-controls">
      {budgets.length > 0 && (
        <>
          <select value={selectedBudgetId} onChange={onSelectBudget}>
            {budgets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <button onClick={onDeleteBudget} className="delete-button">
            Delete Budget
          </button>
        </>
      )}

      <button onClick={toggleCreateForm} className="create-button">
        {showCreateForm ? "Cancel" : "Create Budget"}
      </button>

      {showCreateForm && (
        <BudgetForm
          mode="create"
          initialData={{ name: "", amount: "" }}
          onSubmit={(data) => {
            onCreateBudget(data);
            setShowCreateForm(false); // hide form after successful submit
          }}
          error={createError}
        />
      )}
    </div>
  );
}
