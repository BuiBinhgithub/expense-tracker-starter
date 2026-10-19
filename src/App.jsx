import { useState } from 'react'
import './App.css'
import { INITIAL_TRANSACTIONS } from './constants'
import Summary from './components/Summary'
import SpendingChart from './components/SpendingChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Finance Tracker</h1>
      </header>

      <Summary transactions={transactions} />

      <main className="workspace">
        <TransactionForm onAdd={addTransaction} />
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        <SpendingChart transactions={transactions} />
      </main>
    </div>
  );
}

export default App
