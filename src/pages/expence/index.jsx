import React, { useState } from "react";
import { format, isValid } from "date-fns"; // Import date-fns for date formatting
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";

export const Expense = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotal, setTransactions } =
    useGetTransactions();
  const { deleteTransaction } = useDeleteTransaction();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("income");

  const handleChange = (e) => {
    setDescription(e.target.value);
    e.target.style.height = "auto"; // Reset height to auto to shrink or expand based on content
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the scrollHeight of the content
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      description,
      transactionAmount: parseFloat(transactionAmount),
      transactionType,
    };
    addTransaction(transaction);
    setDescription("");
    setTransactionAmount("");
    setTransactionType("expense");
  };

  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (transactionId) => {
    const transactionToDelete = transactions.find(
      (t) => t.id === transactionId
    );
    if (!transactionToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this transaction?\n\nDescription: ${
        transactionToDelete.description
      }\nAmount: LKR ${transactionToDelete.transactionAmount.toFixed(2)}`
    );

    if (confirmDelete) {
      try {
        await deleteTransaction(transactionId);
        setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  return (
    <>
      {/* My Wallet */}
      <div className="wallet-watcher bg-slate-100">
        <h1 className="justify-center text-center dm-sans-font text-[35px] font-bold py-10 pb-4">
          {name}'s Wallet Watcher
        </h1>

        <div className=" px-4 sm:px-6 lg:px-[10%] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* profile photo and signout */}
          <div className="flex flex-col items-center w-full space-y-4 order-1 sm:order-3">
            {profilePhoto && (
              <div className="profile flex justify-center items-center">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="profilePhoto w-48 h-48 rounded-full border-2 border-blue-300"
                />
              </div>
            )}
            {/* sign out */}
            <div className="pt-10">
              <button
                className="sign-out bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={signUserOut}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* balance */}
          <div className="order-2 sm:order-1">
            <div className="balance border border-blue-700 p-4 rounded-lg shadow-blue-600 shadow-sm">
              <h3 className="text-[30px]">My Balance</h3>
              {transactionsTotal.balance.toFixed(2) >= 0 ? (
                <h2 className="text-[26px]">
                  LKR {transactionsTotal.balance.toFixed(2)}
                </h2>
              ) : (
                <h2 className="text-[26px]">
                  -LKR {(transactionsTotal.balance * -1).toFixed(2)}
                </h2>
              )}
            </div>

            <div className="summary p-5">
              {/* Income */}
              <div className="income border border-green-500 p-4 rounded-lg shadow-green-500 shadow-sm mb-2">
                <h4 className="text-[20px] font-semibold">Income</h4>
                <p className="text-[16px] font-medium">
                  LKR {transactionsTotal.income.toFixed(2)}
                </p>
              </div>
              {/* Expenses */}
              <div className="expenses border border-red-500 p-4 rounded-lg shadow-red-500 shadow-sm">
                <h4 className="text-[20px] font-semibold">Expenses</h4>
                <p className="text-[16px] font-medium">
                  LKR {transactionsTotal.expense.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* add transactions */}
          <div className="flex items-center justify-center h-full px-[2%] order-3 sm:order-2">
            <form className="add-transaction w-full" onSubmit={onSubmit}>
              <textarea
                placeholder="Description"
                required
                value={description}
                onChange={handleChange}
                className="w-full max-h-40 p-2 mb-2 border border-blue-500 rounded resize-none focus:border-blue-500 focus:border-2 outline-none"
              />
              <input
                type="number"
                placeholder="Amount (LKR)"
                required
                value={transactionAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && Number(value) >= 0) {
                    setTransactionAmount(value);
                  }
                }}
                className="w-full p-2 mb-2 border border-blue-500 rounded focus:border-blue-500 focus:border-2 outline-none"
              />
              <div className="flex justify-around mb-2">
                {/* Income */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="income"
                    className="text-green-700 font-semibold cursor-pointer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="w-4 h-4 inline-block rounded-full border border-green-500 mr-2"
                      style={{
                        backgroundColor:
                          transactionType === "income"
                            ? "green"
                            : "transparent",
                      }}
                    ></span>
                    Income
                  </label>
                </div>

                {/* Expense */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="expense"
                    className="text-red-700 font-semibold cursor-pointer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="w-4 h-4 inline-block rounded-full border border-red-500 mr-2"
                      style={{
                        backgroundColor:
                          transactionType === "expense" ? "red" : "transparent",
                      }}
                    ></span>
                    Expense
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>

        {/* Transaction History */}
        <div className="px-[10%] py-10 bg-slate-200">
          <div className="transactions mt-10">
            <h2 className="text-[30px] text-center">Transactions</h2>
            <ul className="list-none p-0">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className={`p-4 border border-gray-300 rounded-lg mb-2 ${
                    transaction.transactionType === "income"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {transaction.description}
                    </span>
                    <span>LKR {transaction.transactionAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {isValid(new Date(transaction.createdAT)) &&
                        format(
                          new Date(transaction.createdAT),
                          "dd MMM yyyy HH:mm"
                        )}
                    </span>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
