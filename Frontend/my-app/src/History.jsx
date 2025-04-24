import React, { useEffect } from "react";
import './History.css';
import { useState } from 'react';
import { toast } from "react-toastify";

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const userEmail = localStorage.getItem("email");
    
    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transactionHistory/${userEmail}`);
            const data = await response.json();
            if (response.status === 200) {
                setTransactions(data);
            } else {
                toast.error(data.alert || "Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching history:", error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="history-container">
            <h1>Transaction History</h1>
            {transactions.length === 0 ? (
                <p>No transaction history found!</p>
            ) : (
                <table className="historyTable">
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount (₹)</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.senderEmail}</td>
                                <td>{transaction.receiverEmail}</td>
                                <td>₹{transaction.amount}</td>
                                <td>{new Date(transaction.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default History;
