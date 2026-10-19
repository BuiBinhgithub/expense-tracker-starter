const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const day = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export const formatMoney = (amount) => money.format(amount);

export const formatDate = (isoDate) => day.format(new Date(`${isoDate}T00:00:00`));

// Round to whole cents so float noise (e.g. -5.5e-17) doesn't survive into totals.
export const roundToCents = (amount) => Math.round(amount * 100) / 100;

// Local calendar date as YYYY-MM-DD; toISOString() would give the UTC date.
export const localDateKey = (d = new Date()) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const formatCategory = (category) => category.charAt(0).toUpperCase() + category.slice(1);
