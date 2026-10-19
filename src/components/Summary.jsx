import { formatMoney, roundToCents } from '../format'

const sumAmounts = (transactions, type) => roundToCents(
  transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0)
);

function Summary({ transactions }) {
  const totalIncome = sumAmounts(transactions, "income");
  const totalExpenses = sumAmounts(transactions, "expense");

  const balance = roundToCents(totalIncome - totalExpenses);
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
