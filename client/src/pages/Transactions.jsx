import React from 'react';

const balance = 120;

const transactions = [
  { id: 1, date: '2025-01-01', type: 'Deposit', amount: 100 },
  { id: 2, date: '2025-01-02', type: 'Withdrawal', amount: 20 },
  { id: 3, date: '2025-01-03', type: 'Deposit', amount: 50 },
  { id: 4, date: '2025-01-04', type: 'Withdrawal', amount: 30 },
];

export default function Transactions() {
  return (
    <div className="transactions">
      <div className="header">
        <h1>Transactions</h1>
      </div>
      <div className="content">
        <div className="balance">
          <h2>Balance: ${balance}</h2>
        </div>
        <div className="history">
          <h2>History</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
