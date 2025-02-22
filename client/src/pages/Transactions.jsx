import React from 'react';

const balance = 120;

let users = {
  1: { id: 1, name: 'Alice', balance: 1000 },
  2: { id: 2, name: 'Bob', balance: 400 },
  3: { id: 3, name: 'Charlie', balance: 300 },
  4: { id: 4, name: 'David', balance: 200 },
  5: { id: 5, name: 'Eve', balance: 500 },
}

let transactions = {
  1: { id: 1, date: '2021-01-01', type: 'deposit', amount: 1000, userId: 1 },
  2: { id: 2, date: '2021-01-02', type: 'withdraw', amount: 100, userId: 1 },
  3: { id: 3, date: '2021-01-03', type: 'deposit', amount: 400, userId: 2 },
  4: { id: 4, date: '2021-01-04', type: 'withdraw', amount: 100, userId: 2 },
  5: { id: 5, date: '2021-01-05', type: 'deposit', amount: 300, userId: 3 },
  6: { id: 6, date: '2021-01-06', type: 'withdraw', amount: 100, userId: 3 },
  7: { id: 7, date: '2021-01-07', type: 'deposit', amount: 200, userId: 4 },
  8: { id: 8, date: '2021-01-08', type: 'withdraw', amount: 100, userId: 4 },
  9: { id: 9, date: '2021-01-09', type: 'deposit', amount: 500, userId: 5 },
  10: { id: 10, date: '2021-01-10', type: 'withdraw', amount: 100, userId: 5 },
};

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
              {Object.values(transactions).map((transaction) => (
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
