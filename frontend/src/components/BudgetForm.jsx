import { useState, useEffect } from "react";

export default function BudgetForm({
  mode = "create", // "create" or "edit"
  initialData = { name: "", amount: "" },
  onSubmit,
  onCancel,
  error
}) {
  const [budget, setBudget] = useState(initialData);

  useEffect(() => {
    setBudget(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(budget);
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-budget-form">
      <h2>{mode === "edit" ? "Edit Budget" : "Create Your Budget"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Budget Name"
        value={budget.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Budget Amount"
        value={budget.amount}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit">
          {mode === "edit" ? "Save Changes" : "Create Budget"}
        </button>

        {mode === "edit" && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
}
