import { formatMoney } from '../format'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const isOver = balance < 0;
  const [whole, cents] = formatMoney(Math.abs(balance)).split(".");

  const spentShare = totalIncome > 0
    ? Math.min(totalExpenses / totalIncome, 1)
    : totalExpenses > 0 ? 1 : 0;

  return (
    <section className="summary" aria-labelledby="summary-lead">
      <p id="summary-lead" className="summary-lead">
        {isOver ? "You've spent more than you earned by" : "You've kept"}
      </p>
      <p className={`summary-balance${isOver ? " is-over" : ""}`}>
        {isOver && "−"}{whole}<span className="summary-cents">.{cents}</span>
      </p>

      <div className="summary-horizon">
        <span className="summary-sun" aria-hidden="true" />
        <div
          className="summary-bar"
          role="img"
          aria-label={`${Math.round(spentShare * 100)}% of income spent`}
        >
          <span className="summary-bar-spent" style={{ width: `${spentShare * 100}%` }} />
        </div>
      </div>

      <dl className="summary-totals">
        <div>
          <dt>Spent</dt>
          <dd className="expense-amount">{formatMoney(totalExpenses)}</dd>
        </div>
        <div>
          <dt>Earned</dt>
          <dd className="income-amount">{formatMoney(totalIncome)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary
