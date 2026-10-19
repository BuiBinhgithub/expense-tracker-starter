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
- `src/App.jsx` holds the whole app in one component: seed transaction data, form state, filter state, derived totals (income, expenses, balance), the add-transaction form and the filtered transactions table. State lives only in memory and resets on reload.
- Styling is plain CSS: `src/index.css` (global) and `src/App.css` (component classes such as `.summary-card`, `.income-amount`, `.expense-amount`).
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. Categories are a hard-coded array in `App.jsx`.

## Known quirks

- `amount` must be a number: the seed data uses numbers and `handleSubmit` converts the input with `Number(amount)`. A string amount would make the `reduce` totals concatenate instead of add.
- ESLint's `no-unused-vars` ignores names that start with an uppercase letter or `_`.
