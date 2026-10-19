# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for a Claude Code course. It is a deliberately flawed React expense tracker: it ships with a bug, a poor UI and messy code, and the course fixes them step by step. Expect to find problems and refactor rather than treat the current structure as intended design.

## Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # ESLint (flat config in eslint.config.js)
```

No test runner is configured yet.

## Architecture

- Stack: React 19 + Vite 7, plain JavaScript (JSX), no TypeScript, no router, no state library, no backend or persistence.
- `src/main.jsx` mounts `<App />` in `StrictMode`.
- `src/App.jsx` owns the `transactions` array (seeded from `INITIAL_TRANSACTIONS`) and passes it down; it is the only place transactions are added. State lives only in memory and resets on reload.
- `src/components/`:
  - `Summary` computes and renders the income, expenses and balance cards from all transactions.
  - `TransactionForm` owns its own input state and calls `onAdd(transaction)` with a complete transaction object.
  - `TransactionList` owns the type/category filter state and renders the filtered table.
- `src/constants.js` holds `CATEGORIES` and the seed `INITIAL_TRANSACTIONS`.
- Styling is plain CSS: `src/index.css` (global) and `src/App.css` (component classes such as `.summary-card`, `.income-amount`, `.expense-amount`).
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. Categories come from `CATEGORIES` in `src/constants.js`.

## Known quirks

- `amount` must be a number: the seed data uses numbers and `handleSubmit` converts the input with `Number(amount)`. A string amount would make the `reduce` totals concatenate instead of add.
- ESLint's `no-unused-vars` ignores names that start with an uppercase letter or `_`.
