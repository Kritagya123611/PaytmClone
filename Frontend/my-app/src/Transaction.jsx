import React, { useState } from "react";
import { toast } from "react-toastify";
import './Transaction.css';

export function Transaction() {
    const [formData, setFormData] = useState({
        amount: "",
        senderEmail: "",
        receiverEmail: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log("Sending to backend:", formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.status === 200) {
                toast.success(data.message || "Transaction successful");
            } else {
                toast.error(data.alert || "Transaction failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred during the transaction");
        }
    }

    return (
        <div>
            <h1>Transactions</h1>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <h3>Transfer Money with ease</h3>
                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        required
                        value={formData.amount}
                        onChange={handleChange}
                        className="amount"
                    />
                    <input
                        type="text"
                        name="senderEmail"
                        placeholder="Sender Address"
                        required
                        value={formData.senderEmail}
                        onChange={handleChange}
                        className="sender"
                    />
                    <input
                        type="text"
                        name="receiverEmail"
                        placeholder="Recipient Address"
                        required
                        value={formData.receiverEmail}
                        onChange={handleChange}
                        className="receiver"
                    />
                    <button type="submit" className="send">Send</button>
                </div>
            </form>
        </div>
    )
}

export default Transaction;
