import { useState } from 'react'
import { CATEGORIES } from '../constants'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTransactions = transactions.filter(t =>
    (filterType === "all" || t.type === filterType) &&
    (filterCategory === "all" || t.category === filterCategory)
  );

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <TransactionRow key={t.id} transaction={t} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
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
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td className={isIncome ? "income-amount" : "expense-amount"}>
        {isIncome ? "+" : "-"}${transaction.amount}
      </td>
      <td>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default TransactionList
