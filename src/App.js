import React, { useState, useEffect } from "react";
import "./styles.css";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import ExpenseSummary from "./components/ExpenseSummary";

function App() {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    const totalExpenses = transactions.reduce(
      (total, transaction) =>
        total + (transaction.type === "expense" ? transaction.amount : 0),
      0
    );
    setExpenses(totalExpenses);
    setIncome(5000 - totalExpenses);
  }, [transactions]);

  // Add Income
  const handleAddIncome = () => {
    const newIncome = prompt("Enter income amount:");
    if (newIncome && !isNaN(newIncome)) {
      setIncome(income + parseFloat(newIncome));
    }
  };

  // Add Expense
  const handleAddExpense = () => {
    const name = prompt("Enter expense name:");
    const amount = parseFloat(prompt("Enter expense amount:"));
    const category = prompt("Enter category:");
    if (!name || isNaN(amount) || !category) {
      alert("Please enter valid details for the expense.");
      return;
    }
    if (amount > income) {
      alert("Insufficient wallet balance!");
      return;
    }
    const newExpense = {
      id: Date.now(),
      name,
      amount,
      category,
      date: new Date().toLocaleDateString(),
      type: "expense",
    };
    setTransactions([...transactions, newExpense]);
  };

  // Edit Transaction
  const handleEditTransaction = (transactionToEdit) => {
    const newName = prompt("Edit name:", transactionToEdit.name);
    const newAmount = parseFloat(
      prompt("Edit amount:", transactionToEdit.amount)
    );
    const newCategory = prompt("Edit category:", transactionToEdit.category);
    if (!newName || isNaN(newAmount) || !newCategory) {
      alert("Invalid details entered.");
      return;
    }
    const updatedTransaction = {
      ...transactionToEdit,
      name: newName,
      amount: newAmount,
      category: newCategory,
    };
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === transactionToEdit.id
          ? updatedTransaction
          : transaction
      )
    );
  };

  // Delete Transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="app-container">
      <h1 className="header">Expense Tracker</h1>
      <div className="content-wrapper">
        {/* Wallet Balance Section */}
        <div className="balance-section">
          <BalanceCard
            title="Wallet Balance"
            amount={`₹${income}`}
            buttonText="+ Add Income"
            buttonClass="add-income"
            onClick={handleAddIncome}
          />
          <BalanceCard
            title="Expenses"
            amount={`₹${expenses}`}
            buttonText="+ Add Expense"
            buttonClass="add-expense"
            onClick={handleAddExpense}
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="expense-chart">
            <ExpenseSummary transactions={transactions} type="pie" />
          </div>
          <div className="top-expenses">
            <h2>Top Expenses</h2>
            <ExpenseSummary transactions={transactions} type="bar" />
          </div>
        </div>

        {/* Transactions Section */}
        <div className="transactions-section">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;


