import React, { useState } from "react";

function AddTransactionForm({transactions, setTransaction}) {
const [formData, setFormData] = useState({
  date:"",
  description:"",
  category:"",
  amount:""
})


function handleChange(event){
const name = event.target.name;
const value = event.target.value;

setFormData({...formData, [name] : value })
}





function handleSubmit(event){
  event.preventDefault();

  const newTransaction = {
    ...formData, amount: parseFloat(formData.amount),
  }
  fetch("http://localhost:8001/transactions",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTransaction)
  })
  .then(res => res.json())
  .then((data)=> setTransaction([...transactions, data]))

}
 




  return (

    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleChange}/>
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
          <input type="text" name="category" placeholder="Category" value={formData.Category} onChange={handleChange}/>
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={handleChange} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}



export default AddTransactionForm;
