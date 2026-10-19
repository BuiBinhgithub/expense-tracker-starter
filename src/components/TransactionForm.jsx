import { useState } from 'react'
import { CATEGORIES } from '../constants'
import { formatCategory, localDateKey } from '../format'

const MIN_AMOUNT = 0.01;
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
    // Native required/pattern/min block bad input with a message; this is only a backstop.
    // If the form ever sets noValidate, show an error here instead of returning silently.
    const trimmed = description.trim();
    const value = Number(amount);
    if (!trimmed || !Number.isFinite(value) || value < MIN_AMOUNT) return;

    onAdd({
      id: Date.now(),
      description: trimmed,
      amount: value,
      type,
      category,
      date: localDateKey(),
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
            required
            // Must contain at least one non-space character.
            pattern=".*\S.*"
            title="Description can't be blank"
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
              min={MIN_AMOUNT}
              step={MIN_AMOUNT}
              required
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
