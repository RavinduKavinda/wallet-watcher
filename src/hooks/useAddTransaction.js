import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = () => {
    const { userID } = useGetUserInfo();
    const transactionCollectionRef = collection(db, "Transactions");

    const addTransaction = async ({ description, transactionAmount, transactionType }) => {
        try {
            await addDoc(transactionCollectionRef, {
                userID,
                description,
                transactionAmount,
                transactionType,
                createdAT: serverTimestamp()
            });
            console.log('Transaction added');
        } catch (err) {
            console.error('Error adding transaction: ', err);
        }
    };

    return { addTransaction };
};
