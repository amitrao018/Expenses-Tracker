import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions to show</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id} className="transaction">
            <div className="transaction-info">
              <p>
                <strong>{transaction.name}</strong> - {transaction.category}
              </p>
              <span>{transaction.date}</span>
            </div>
            <p className="transaction-amount">₹{transaction.amount}</p>
            <div className="transaction-actions">
              <FaEdit
                className="edit-icon"
                onClick={() => onEditTransaction(transaction)}
              />
              <FaTrash
                className="delete-icon"
                onClick={() => onDeleteTransaction(transaction.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;