"use client";

import { useEffect, useState } from "react";


/* API URL CONSTANT (HERE) */
const APIurl = "http://172.25.9.156:3000";

export default function Page() {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingID, setEditingID] = useState("");

  //fetch expenses
  const fetchExpenses=() => {
    fetch(`${APIurl}/api/expenses`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  };

  //runs once page reloads
  useEffect(()=>{
    fetchExpenses();
  },[]);

//handle form submit
const handleSubmit = (e) =>{
  e.preventDefault()

  const method = editingID ? "PUT":"POST"
  const url = editingID 
  ? `${APIurl}/api/expenses/${editingID}` 
  : `${APIurl}/api/expenses`

  fetch(url,{
    method,
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      amount: Number(amount),
      category,
    }),
  })
  .then(()=>{
    setTitle("")
    setAmount("")
    setCategory("")
    setEditingID(null)
    fetchExpenses()
  })
  .catch((err)=>console.log(err))
};


//handle Delete operation
const handleDelete = (id) =>{
  fetch(`${APIurl}/api/expenses/${id}`,{
    method: "DELETE",
  })
  .then(() => fetchExpenses())
  .catch((err)=>console.log(err))
}

//handle Edit/Update operation
const handleEdit = (expense) =>{
  setTitle(expense.title)
  setAmount(expense.amount)
  setCategory(expense.category)
  setEditingID(expense._id)
}


  return (
    <main style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      <form onSubmit ={handleSubmit}>
        <input
          placeholder="Title"
          value ={title}
          onChange = {(e)=>setTitle(e.target.value)}
          />

        <br />

        <input
        type="number"
          placeholder="Amount"
          value ={amount}
          onChange = {(e)=>setAmount(e.target.value)}
          />

        <br />

        <input
          placeholder="Category"
          value ={category}
          onChange = {(e)=>setCategory(e.target.value)}
          />

          <br />

          <button type="submit">
            {editingID ? "Update Expense":"Add Expense"}
            </button>
      </form>


      <hr />

      {expenses.length === 0 && <p>No expenses found</p>}

      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title} — ₹{expense.amount} — {expense.category}

            
            <button
            style = {{margin: "10px"}}
            onClick ={()=>handleDelete(expense._id)} 
            >
              Delete
            </button>

            

            <button 
            style={{margin: "10px"}}
            onClick={()=>handleEdit(expense)}
            >
              Edit
            </button>
            
          </li>
        ))}
      </ul>
    </main>
  );
}


