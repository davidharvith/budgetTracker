import React from "react";
import RecentTransactions from "./RecentTransactions";

export default function TransactionsSection({
  budgetId,
  refreshKey,
  transaction,
  transactionError,
  onTransactionChange,
  onAddTransaction
}) {
  if (!budgetId) return null;

  return (
    <div className="dashboard-recent">
      <h2>Recent Transactions</h2>
      <div className="dashboard-transactions-placeholder">
        <RecentTransactions budgetId={budgetId} refreshKey={refreshKey} />
      </div>

      <form onSubmit={onAddTransaction} className="dashboard-transaction-form">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={onTransactionChange}
          required
          min="0"
          step="0.01"
        />
        <select
          name="type"
          value={transaction.type}
          onChange={onTransactionChange}
          required
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={transaction.category}
          onChange={onTransactionChange}
          required
        />
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={onTransactionChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={transaction.description}
          onChange={onTransactionChange}
        />
        <button type="submit">Add Transaction</button>
        {transactionError && <div className="error">{transactionError}</div>}
      </form>
    </div>
  );
}
