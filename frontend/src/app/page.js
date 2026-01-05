"use client";

import { useEffect, useState } from "react";


/* API URL CONSTANT (HERE) */
const APIurl = "http://172.25.8.58:3000";

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

 //user sends i paid 
 const currentUserId = "user1"
 const markAsPaid =  async(expenseId) => {
   await fetch(`${APIurl}/api/expenses/${expenseId}/pay`,{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body: JSON.stringify({
       userId:currentUserId
     })
   })
   fetchExpenses()
 }

 //function for the reciever to confirm

 const confirmPayment = async(expenseId)=>{
  await fetch(`${APIurl}/api/expenses/${expenseId}/confirm`,{
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body: JSON.stringify({
      userId:currentUserId
    })
  });
  fetchExpenses()
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
            
            {/*show buttons conditionally of confirmation*/}

        
      </form>

      <hr />

      {expenses.length === 0 && <p>No expenses found</p>}

      {expenses.map((expense)=>(
            <div key = {expense._id} style={{}}>
              <h3>{expense.title}</h3>
              
              {expense.splits.map((split)=>(
                <div key = {split.userId}>
                  <span>
                    user {split.userId} = ₹{split.share} ({split.status})
                    
                  </span>

                  <p>
                    DEBUG: currentUserId = {currentUserId}
                  </p>
                  <p>
                    DEBUG: expense.paidBy = {expense.paidBy}
                  </p>

                  {/*PAY button*/}
                  {split.userId===currentUserId && split.status === "UNPAID" && (
                    <button onClick={()=>markAsPaid(expense._id)}>
                      PAY
                    </button>
                  )}

                  {/*CONFIRM button*/}
                  {expense.paidBy===currentUserId && split.status === "PAID" && (
                    <button onClick={()=>confirmPayment(expense._id)}>
                      CONFIRM
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}

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


