import { useEffect, useState } from "react";
import API from "../services/api";
import { format } from "date-fns";

export default function RecentTransactions({ budgetId, refreshKey }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!budgetId) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await API.get(`/api/budgets/${budgetId}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sorted = [...response.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sorted);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [budgetId, refreshKey]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-center">Recent Transactions</h3>

      <div className="overflow-y-auto max-h-64 border rounded-md">
        {loading ? (
          <div className="text-center text-gray-500 p-4">Loading transactions...</div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : transactions.length === 0 ? (
          <div className="text-center text-gray-500 p-4">No transactions found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{format(new Date(txn.date), "yyyy-MM-dd")}</td>
                  <td className="p-2">{txn.description}</td>
                  <td className={`p-2 ${txn.type === "EXPENSE" ? "text-red-600" : "text-green-600"}`}>
                    {txn.type}
                  </td>
                  <td className="p-2 text-right">${txn.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
