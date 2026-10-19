const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const day = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export const formatMoney = (amount) => money.format(amount);

export const formatDate = (isoDate) => day.format(new Date(`${isoDate}T00:00:00`));

export const formatCategory = (category) => category.charAt(0).toUpperCase() + category.slice(1);
