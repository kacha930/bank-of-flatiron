import React,{ useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import {useEffect} from "react";




function AccountContainer() {
const [transactions, setTransaction] = useState ([]);
const [searchWord, setSearchWord] = useState ("");


  useEffect(() => {
    fetch("http://localhost:8001/transactions")
    .then(resp => resp.json())
    .then((data) => {
      console.log(data)
      setTransaction(data)})
  }, []);





  //search function
  function handleSearch(event){
    setSearchWord(event.target.value)
    
  }
  //filtering 
  const toFilter = transactions.filter((transaction) => {
    if(transaction.category.toLowerCase().includes(searchWord))
      
      return transaction

    else if(searchWord === "" )
      return true
  } )

  return (
    <div>
      <Search  handleSearch={handleSearch}/>
      <AddTransactionForm transactions={transactions} setTransaction={setTransaction}/>
      <TransactionsList filteredTransactions={toFilter}/>
    </div>
  );
}


export default AccountContainer;
