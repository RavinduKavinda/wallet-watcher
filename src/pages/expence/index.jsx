import React from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction"

export const Expense = () => {

  const { addTransaction } = useAddTransaction();

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({
      description: "adasd",
      transactionAmount: 23,
      transactionType: "expense"
    })
  };

  return (
    <>
    {/* My Wallet */}
    <div className="wallet-watcher">
      <div className="container">
        <h1>Wallet Watcher</h1>

        {/* balance */}
        <div className="balance">
          <h3>My Balance</h3>
          <h2>LKR 0.00</h2>
        </div>

        <div className="summary">
          {/* Income */}
          <div className="income">
            <h4>Income</h4>
            <p>LKR 0.00</p>
          </div>
          {/* Expenses */}
          <div className="expenses">
            <h4>Expenses</h4>
            <p>LKR 0.00</p>
          </div>
        </div>

        {/* add transactions */}
        <form action="" className="add-transaction" onSubmit={onSubmit}>
          <input type="text" placeholder="Description" required />
          <input type="number" placeholder="Amount" required />
          <label htmlFor="expense">Expense</label>
          <input type="radio" id="expense" value="expense" />
          <label htmlFor="income">Income</label>
          <input type="radio" id="income" value="income" />

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>

    {/* Transaction History */}
    <div className="transactions">
      <h3>Transactions</h3>
    </div>
    
    </>
  );
};
