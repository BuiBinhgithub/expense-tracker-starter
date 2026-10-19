import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";
import { formatCategory, formatMoney } from "../format";

const BAR_ROW_HEIGHT = 36;
const TEXT = "#EFE8FF";
const TEXT_SOFT = "#A99BD1";
const LINE = "#3A2A6E";
const MAGENTA = "#FF3EA5";
const formatWhole = (v) => formatMoney(v).replace(/\.00$/, "");

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
    <section className="panel spending-chart" aria-labelledby="spending-heading">
      <h2 id="spending-heading">Where it went</h2>
      {data.length === 0 ? (
        <p className="empty-chart">No expenses yet. Add one to see where your money goes.</p>
      ) : (
        <BarChart
          responsive
          style={{ width: "100%", height: data.length * BAR_ROW_HEIGHT + 40 }}
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 64, bottom: 0, left: 0 }}
        >
          <CartesianGrid horizontal={false} stroke={LINE} />
          <XAxis
            type="number"
            tickFormatter={formatWhole}
            tick={{ fontSize: 11, fill: TEXT_SOFT }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={92}
            tickFormatter={formatCategory}
            tick={{ fontSize: 13, fill: TEXT }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v) => [formatMoney(v), "Spent"]}
            labelFormatter={formatCategory}
            cursor={{ fill: "#2A1A55" }}
            contentStyle={{ background: "#140A2C", border: `1px solid ${LINE}`, borderRadius: 6, fontSize: 13 }}
            labelStyle={{ color: TEXT }}
            itemStyle={{ color: MAGENTA }}
          />
          <Bar
            dataKey="amount"
            fill={MAGENTA}
            radius={[0, 3, 3, 0]}
            barSize={14}
          >
            <LabelList
              dataKey="amount"
              position="right"
              formatter={formatWhole}
              style={{ fontSize: 12, fill: TEXT, fontVariantNumeric: "tabular-nums" }}
            />
          </Bar>
        </BarChart>
      )}
    </section>
  );
}

export default SpendingChart;
