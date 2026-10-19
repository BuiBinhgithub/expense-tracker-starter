import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";

const BAR_ROW_HEIGHT = 40;

function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-chart">No expenses yet.</p>
      ) : (
        <BarChart
          responsive
          style={{ width: "100%", height: data.length * BAR_ROW_HEIGHT + 40 }}
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 56, bottom: 0, left: 8 }}
        >
          <CartesianGrid horizontal={false} stroke="#eee" />
          <XAxis
            type="number"
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 12, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={100}
            tick={{ fontSize: 13, fill: "#333" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v) => [`$${v}`, "Spent"]}
            cursor={{ fill: "#f5f5f5" }}
          />
          <Bar
            dataKey="amount"
            fill="#c0392b"
            radius={[0, 4, 4, 0]}
            barSize={20}
          >
            <LabelList
              dataKey="amount"
              position="right"
              formatter={(v) => `$${v}`}
              style={{ fontSize: 12, fill: "#333" }}
            />
          </Bar>
        </BarChart>
      )}
    </div>
  );
}

export default SpendingChart;
