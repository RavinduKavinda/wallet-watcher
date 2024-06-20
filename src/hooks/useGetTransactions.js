import { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const { userID } = useGetUserInfo();

    useEffect(() => {
        const transactionCollectionRef = collection(db, 'Transactions');

        const getTransactions = () => {
            try {
                const queryTransactions = query(
                    transactionCollectionRef,
                    where('userID', '==', userID),
                    orderBy('createdAT')
                );

                const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                    const docs = snapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));

                    console.log('Fetched transactions:', docs);
                    setTransactions(docs);
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

    return { transactions };
};
