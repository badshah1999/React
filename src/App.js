import Content from "./Content";
import Search from './Search'
import Header from "./Header";
import Add from './Add'
import { useEffect, useState } from "react";
import apiRequest from "./apiRequest";
function App() {
  
  const [additems,setAddItems] = useState('')
  const [search,setSearch] = useState('')
  const [items,setItem] = useState([])
  const [fetchError,setFetchError] = useState(null)
  const API = "http://localhost:3500/items"
  useEffect(()=>{
    const apiData=async()=>{
      try{
      const response = await fetch(API)
      if(!response.ok) throw Error("Data not received")
      const convert = await response.json()
      setItem(convert)
      setFetchError(null)
      }
      catch(err){
        setFetchError(err.message)
      }
    }
    apiData()
  },[])
  

  const change = async(id) =>{
    const list = items.map(item=>
      item.id===id?{...item,checked:!item.checked}:item)
    setItem(list)

    const update = list.filter((item=>item.id===id))
    const data = {
      method:'PATCH',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({checked:update[0].checked})
    }
    const url = `${API}/${id}`
    const result= await apiRequest(url,data)
    if(result) setFetchError(result)
    //localStorage.setItem("todo",JSON.stringify(list))
  }
  
  const addItem = (e) =>{
    e.preventDefault()
    if(!additems)return
    adding(additems)
    setAddItems('')
  }
  const adding =async(text)=>{
    const id = items.length ? items[items.length-1].id+1:1
    const list = {id,checked:false,text}
    const newList = [...items,list]
    setItem(newList)
    const data = {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(list)
    }
    const result= await apiRequest(API,data)
    if(result) setFetchError(result)
  }

  const deleteItem=async(id)=>{
    const list = items.filter(item=>
      item.id!==id)
    setItem(list)
    const data = {method:'DELETE'}
    const url = `${API}/${id}`
    const result= await apiRequest(url,data)
    if(result) setFetchError(result)
  }
  return (
    <div className="App">
        <Header />
        <Search 
        search={search}
        setSearch={setSearch}
        />
        <Add 
        additems={additems}
        setAddItems={setAddItems}
        addItem={addItem}
        />
        <main>
          {fetchError && <p
          style={{
            fontSize:'30px',
            textAlign:'center',
            color:'palegoldenrod'
          }}
          >{`Error : ${fetchError}`}</p>}
        {!fetchError && 
        <Content 
        item={items.filter(item=>(item.text).toLowerCase().includes(search.toLowerCase()))}
        change={change}
        deleteItem={deleteItem}
        />}
        </main>
    </div>
  );
}

export default App;
