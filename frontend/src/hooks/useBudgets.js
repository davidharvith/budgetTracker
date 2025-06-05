import { useEffect, useState } from "react";
import API from "../services/api";

export default function useBudgets(navigate) {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBudgets = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return navigate("/login");

    setLoading(true);
    setError("");
    try {
      const res = await API.get("/api/budgets", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgets(res.data);
      if (res.data.length > 0) {
        setSelectedBudgetId(res.data[0].id);
      }
    } catch (err) {
      setError("Failed to fetch budgets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return {
    budgets,
    selectedBudgetId,
    setSelectedBudgetId,
    loading,
    error,
    refetchBudgets: fetchBudgets
  };
}
