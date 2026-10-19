import { useState } from 'react'
import { CATEGORIES } from '../constants'
import { formatCategory } from '../format'

const DEFAULT_TYPE = "expense";
const DEFAULT_CATEGORY = "food";
const TYPES = ["expense", "income"];

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(DEFAULT_TYPE);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType(DEFAULT_TYPE);
    setCategory(DEFAULT_CATEGORY);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    resetForm();
  };

  return (
    <section className="panel add-transaction" aria-labelledby="add-heading">
      <h2 id="add-heading">Add a transaction</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <fieldset className="segmented">
          <legend className="visually-hidden">Type</legend>
          {TYPES.map(t => (
            <label key={t}>
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={(e) => setType(e.target.value)}
              />
              <span>{formatCategory(t)}</span>
            </label>
          ))}
        </fieldset>

        <label className="field">
          <span>Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Amount</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label className="field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{formatCategory(cat)}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className={`button-primary is-${type}`}>
          Add {type}
        </button>
      </form>
    </section>
  );
}

export default TransactionForm
