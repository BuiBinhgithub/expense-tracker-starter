import { useState } from 'react'
import './App.css'
import { INITIAL_TRANSACTIONS } from './constants'
import Summary from './components/Summary'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App
