import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });

  const { userID } = useGetUserInfo();

  useEffect(() => {
    const transactionCollectionRef = collection(db, "Transactions");

    const getTransactions = () => {
      try {
        const queryTransactions = query(
          transactionCollectionRef,
          where("userID", "==", userID),
          orderBy("createdAT", "desc")
        );

        const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          const docs = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              id: doc.id,
              createdAT: data.createdAT ? data.createdAT.toDate() : new Date(), // Check for null and default to current date
            };
          });

          let totalIncome = 0;
          let totalExpenses = 0;

          docs.forEach((data) => {
            if (data.transactionType === "expense") {
              totalExpenses += Number(data.transactionAmount);
            } else {
              totalIncome += Number(data.transactionAmount);
            }
          });

          const balance = totalIncome - totalExpenses;

          setTransactions(docs);
          setTransactionsTotal({
            balance,
            income: totalIncome,
            expense: totalExpenses,
          });
        });

        return unsubscribe;
      } catch (err) {
        console.error(err);
        return () => {};
      }
    };

    const unsubscribe = getTransactions();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userID]);

  return { transactions, transactionsTotal, setTransactions };
};
