import { db } from "../config/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (transactionId) => {
    try {
      const transactionDocRef = doc(db, "Transactions", transactionId);
      await deleteDoc(transactionDocRef);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return { deleteTransaction };
};
