import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetControls from "../components/BudgetControls";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import TransactionsSection from "../components/TransactionsSection";
import useTransactions from "../hooks/useTransactions";
import API from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [chartRefreshKey, setChartRefreshKey] = useState(0);
  const [createError, setCreateError] = useState("");

  // ✅ Use useTransactions hook
  const {
    transaction,
    transactionError,
    handleTransactionChange,
    addTransaction,
  } = useTransactions(selectedBudgetId, () => {
    fetchSummary();
    setChartRefreshKey((prev) => prev + 1);
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBudgets(token);
  }, [navigate]);

  useEffect(() => {
    if (selectedBudgetId) {
      fetchSummary();
    }
  }, [selectedBudgetId]);

  const fetchBudgets = async (token) => {
    try {
      const res = await API.get("/api/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgets(res.data);
      if (res.data.length > 0) {
        setSelectedBudgetId(res.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch budgets", err);
    }
  };

  const fetchSummary = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token || !selectedBudgetId) return;

    try {
      const res = await API.get(`/api/budgets/${selectedBudgetId}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary", err);
    }
  };

  const handleBudgetChange = (e) => {
    setSelectedBudgetId(e.target.value);
  };

  const handleCreateBudget = async (budget) => {
    setCreateError("");
    try {
      const token = localStorage.getItem("jwtToken");
      await API.post("/api/budgets", budget, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBudgets(token);
    } catch (err) {
      setCreateError(err.response?.data?.message || "Failed to create budget.");
    }
  };

  const handleDeleteBudget = async () => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      await API.delete(`/api/budgets/${selectedBudgetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await API.get("/api/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgets(res.data);

      if (res.data.length > 0) {
        setSelectedBudgetId(res.data[0].id);
      } else {
        setSelectedBudgetId(null);
        setSummary(null);
      }
      setChartRefreshKey((prev) => prev + 1);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete budget.");
    }
  };

  // ✅ Call addTransaction from hook
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    await addTransaction();
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <BudgetControls
        budgets={budgets}
        selectedBudgetId={selectedBudgetId}
        onSelectBudget={handleBudgetChange}
        onDeleteBudget={handleDeleteBudget}
        onCreateBudget={handleCreateBudget}
        createError={createError}
      />

      <SummaryCards summary={summary} />

      <ChartsSection budgetId={selectedBudgetId} refreshKey={chartRefreshKey} />

      <TransactionsSection
        budgetId={selectedBudgetId}
        refreshKey={chartRefreshKey}
        transaction={transaction}
        transactionError={transactionError}
        onTransactionChange={handleTransactionChange}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
