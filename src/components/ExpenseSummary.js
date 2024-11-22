import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ExpenseSummary({ transactions, type = "pie" }) {
  // Calculate total expenses by category
  const categoryTotals = transactions.reduce((totals, transaction) => {
    const category = transaction.category; // Ensure 'category' is used
    if (category) {
      totals[category] = (totals[category] || 0) + transaction.amount;
    }
    return totals;
  }, {});

  // Format the data for the chart
  const data = Object.keys(categoryTotals).map((key) => ({
    name: key, // category name
    value: categoryTotals[key],
  }));

  // Define colors for the pie chart
  const COLORS = [
    "#A020F0",
    "#FFD700",
    "#FF6347",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
  ];

  // Function to display percentage inside the pie chart
  const renderLabel = (entry) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((entry.value / total) * 100).toFixed(2); // Calculate percentage
    return `${percentage}%`; // Return percentage
  };

  return (
    <div className="expense-summary">
      {data.length === 0 ? (
        <p>No expenses to show</p>
      ) : type === "pie" ? (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              label={renderLabel} // Use custom label renderer for percentages
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#A020F0" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseSummary;