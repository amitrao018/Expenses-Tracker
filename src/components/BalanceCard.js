import React from "react";

function BalanceCard({ title, amount, buttonText, buttonClass, onClick }) {
  return (
    <div className="balance-card">
      <h2>
        {title}: <span>{amount}</span>
      </h2>
      <button className={`button ${buttonClass}`} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default BalanceCard;