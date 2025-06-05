import { useState, useEffect } from "react";
import API from "../services/api";

export default function useSummary(budgetId) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token || !budgetId) return;

    setLoading(true);
    setError("");

    try {
      const res = await API.get(`/api/budgets/${budgetId}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary", err);
      setError(err.response?.data?.message || "Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [budgetId]);

  return { summary, fetchSummary, loading, error };
}
