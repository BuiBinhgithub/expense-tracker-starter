import { useState } from 'react'
import { CATEGORIES } from '../constants'
import { formatCategory, formatDate, formatMoney } from '../format'

const TYPE_FILTERS = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expenses" },
];

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTransactions = transactions
    .filter(t =>
      (filterType === "all" || t.type === filterType) &&
      (filterCategory === "all" || t.category === filterCategory)
    )
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  const clearFilters = () => {
    setFilterType("all");
    setFilterCategory("all");
  };

  return (
    <section className="panel transactions" aria-labelledby="transactions-heading">
      <div className="transactions-header">
        <h2 id="transactions-heading">Transactions</h2>
        <div className="filters">
          <fieldset className="segmented segmented-small">
            <legend className="visually-hidden">Show</legend>
            {TYPE_FILTERS.map(f => (
              <label key={f.value}>
                <input
                  type="radio"
                  name="filter-type"
                  value={f.value}
                  checked={filterType === f.value}
                  onChange={(e) => setFilterType(e.target.value)}
                />
                <span>{f.label}</span>
              </label>
            ))}
          </fieldset>
          <select
            aria-label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{formatCategory(cat)}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          {transactions.length === 0 ? (
            <p>No transactions yet. Add one to start tracking.</p>
          ) : (
            <>
              <p>No transactions match these filters.</p>
              <button type="button" className="button-quiet" onClick={clearFilters}>
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <table className="ledger">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col" className="amount-col">Amount</th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <TransactionRow key={t.id} transaction={t} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function TransactionRow({ transaction, onDelete }) {
  const isIncome = transaction.type === "income";

  const handleDelete = () => {
    if (window.confirm(`Delete "${transaction.description}"?`)) {
      onDelete(transaction.id);
    }
  };

  return (
    <tr>
      <td className="date-cell">{formatDate(transaction.date)}</td>
      <td>
        <span className="description">{transaction.description}</span>
        <span className="category">{formatCategory(transaction.category)}</span>
      </td>
      <td className={`amount-col ${isIncome ? "income-amount" : "expense-amount"}`}>
        {isIncome ? "+" : "−"}{formatMoney(transaction.amount)}
      </td>
      <td className="action-cell">
        <button
          type="button"
          className="delete-btn"
          aria-label={`Delete ${transaction.description}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionList
