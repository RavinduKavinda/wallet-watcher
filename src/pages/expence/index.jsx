import React, { useState } from "react";
import { format } from "date-fns"; // Import date-fns for date formatting
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";

export const Expense = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();

  const handleChange = (e) => {
    setDescription(e.target.value);
    e.target.style.height = "auto"; // Reset height to auto to shrink or expand based on content
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the scrollHeight of the content
  };

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
      createdAT: new Date(), // Add createdAT timestamp
    });
    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  };

  return (
    <>
      {/* My Wallet */}
      <div className="wallet-watcher bg-slate-100">
        <h1 className="justify-center text-center dm-sans-font text-[35px] font-bold py-10 pb-4">
          Wallet Watcher
        </h1>

        <div className="container px-[5%] grid grid-cols-3 gap-10">
          {/* balance */}
          <div className="">
            <div className="balance border border-blue-700 p-4 rounded-lg shadow-blue-600 shadow-sm">
              <h3 className="text-[30px]">My Balance</h3>
              <h2 className="text-[26px]">LKR 0.00</h2>
            </div>

            <div className="summary p-5">
              {/* Income */}
              <div className="income border border-green-500 p-4 rounded-lg shadow-green-500 shadow-sm mb-2">
                <h4 className="text-[20px] font-semibold">Income</h4>
                <p className="text-[16px] font-medium">LKR 0.00</p>
              </div>
              {/* Expenses */}
              <div className="expenses border border-red-500 p-4 rounded-lg shadow-red-500 shadow-sm">
                <h4 className="text-[20px] font-semibold">Expenses</h4>
                <p className="text-[16px] font-medium">LKR 0.00</p>
              </div>
            </div>
          </div>

          {/* add transactions */}
          <div className="flex items-center justify-center h-full px-[2%]">
            <form className="add-transaction" onSubmit={onSubmit}>
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
      </div>

      {/* Transaction History */}
      <div className="px-[10%] py-10 bg-slate-200">
        <div className="transactions border border-blue-700 rounded-lg shadow-blue-600 shadow-sm">
          <h3 className="text-[28px] text-white dm-sans-font font-semibold bg-blue-700 rounded-t-lg pl-4 mb-2">
            Transactions
          </h3>

          {/* All Transaction */}
          <ul>
            {transactions.length > 0 ? (
              transactions
                .sort((a, b) => b.createdAT.seconds - a.createdAT.seconds) // Sort by createdAT
                .map((transaction) => {
                  const { description, transactionAmount, transactionType, createdAT, id } =
                    transaction;

                  const formattedDate = format(
                    new Date(createdAT.seconds * 1000),
                    "PPpp"
                  );

                  return (
                    <li key={id} className="px-4 py-1 border-b border-gray-400 mb-2">
                      <h4 className="text-[20px] capitalize font-semibold">
                        {description}
                      </h4>

                      <div className="flex items-center justify-between">
                        <p>
                        LKR {transactionAmount}{" "}
                        <label
                          htmlFor=""
                          style={{
                            color:
                              transactionType === "expense" ? "red" : "green",
                          }}
                          className="capitalize"
                        >
                          {transactionType}
                        </label>
                      </p>
                      <p className="text-sm text-gray-500">{formattedDate}</p>
                      </div>
                      
                    </li>
                  );
                })
            ) : (
              <li className="px-4 py-1">
                <h4 className="text-[20px] capitalize font-semibold">
                  No transactions
                </h4>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
