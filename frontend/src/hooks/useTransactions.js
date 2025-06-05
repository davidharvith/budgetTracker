// src/hooks/useTransactions.js
import { useState } from "react";
import API from "../services/api";

export default function useTransactions(budgetId, onSuccess) {
  const [transaction, setTransaction] = useState({
    amount: "",
    type: "EXPENSE",
    category: "",
    date: "",
    description: "",
  });

  const [transactionError, setTransactionError] = useState("");

  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const resetTransaction = () => {
    setTransaction({
      amount: "",
      type: "EXPENSE",
      category: "",
      date: "",
      description: "",
    });
  };

  const addTransaction = async () => {
    setTransactionError("");
    try {
      const token = localStorage.getItem("jwtToken");
      await API.post(`/api/budgets/${budgetId}/transactions`, transaction, {
        headers: { Authorization: `Bearer ${token}` },
      });
      resetTransaction();
      onSuccess?.();
    } catch (err) {
      setTransactionError(err.response?.data?.message || "Failed to add transaction.");
    }
  };

  return {
    transaction,
    transactionError,
    handleTransactionChange,
    addTransaction,
  };
}
