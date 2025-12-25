"use client";

import { useEffect, useState } from "react";

/*
  This tells TypeScript:
  "An expense will look like this"
*/
type Expense = {
  _id: string;
  title: string;
  amount: number;
  category: string;
};

export default function Home() {
  // This means: expenses will be a list of Expense objects
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // This runs once when the page loads
  useEffect(() => {
    fetch("http://192.168.137.1:3000/api/expenses")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
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
