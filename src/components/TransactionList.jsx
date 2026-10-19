import { useState } from 'react'
import { CATEGORIES } from '../constants'

function TransactionList({ transactions }) {
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
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TransactionRow({ transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td className={isIncome ? "income-amount" : "expense-amount"}>
        {isIncome ? "+" : "-"}${transaction.amount}
      </td>
    </tr>
  );
}

export default TransactionList
