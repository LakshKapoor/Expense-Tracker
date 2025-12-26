"use client";

import { useEffect, useState } from "react";

/* 👇 API URL CONSTANT (HERE) */
// const APIurl = "http://192.168.137.1:3000";

export default function Page() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      {expenses.length === 0 && <p>No expenses found</p>}

      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title} — ₹{expense.amount}
          </li>
        ))}
      </ul>
    </main>
  );
}
