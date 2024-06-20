import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";

export const Expense = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();

  /* get data from form */
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount: parseFloat(transactionAmount),
      transactionType,
    });
    setDescription('');
    setTransactionAmount(0);
    setTransactionType('expense');
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
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transactions">
        <h3>Transactions</h3>

        {/* All Transaction */}
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id } = transaction;

            return (
              <li key={id}>
                <h4>{description}</h4>
                <p>
                  LKR {transactionAmount}{" "}
                  <label
                    htmlFor=""
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
